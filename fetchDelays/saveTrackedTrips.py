from mongo_client import MongoDBClient
from tntrasporti_client import TNTrasportiClient
from datetime import datetime
from time import sleep
import logging

# Configura il logging
logging.basicConfig(filename='saveTrackedTrips.log', level=logging.INFO, format='%(asctime)s %(message)s')

def main():
    
    # 539 route id del 4
    tnClient = TNTrasportiClient()
    mongo = MongoDBClient()
    trackedbus = mongo.get_all_tracked_bus()
    
    for t in trackedbus:
        tripId = t['tripId']
        
        # Retry logic for getting trip details
        while True:
            try:
                trip = tnClient.get_trip_details(tripId)
                break
            except Exception as e:
                logging.error(f"Errore nella richiesta dei dettagli del viaggio per tripId {tripId}: {e}")
                sleep(5)  # Attendi un po' prima di riprovare

        stopTimes = trip['stopTimes']

        routeName = trip['tripHeadsign']
        routeId = trip['routeId']
        direction = trip['directionId']
        startTripTime = stopTimes[0]['arrivalTime']
        endTripTime = stopTimes[-1]['arrivalTime']
        date = datetime.utcnow().isoformat() + "Z"

        # TRIP INFO
        while True:
            try:
                averageDelay = mongo.getAverageDelayByTripId(tripId)
                break
            except Exception as e:
                logging.error(f"Errore nella richiesta del ritardo medio per tripId {tripId}: {e}")
                sleep(5)  # Attendi un po' prima di riprovare

        if averageDelay is not None:
            while True:
                try:
                    mongo.insert_trip_info(routeName, routeId, direction, date, tripId, startTripTime, endTripTime, averageDelay)
                    break
                except Exception as e:
                    logging.error(f"Errore nell'inserimento delle informazioni del viaggio per tripId {tripId}: {e}")
                    sleep(5)  # Attendi un po' prima di riprovare
        
        while True:
            try:
                delayRecords = mongo.getAllDelaysByTripId(tripId)
                break
            except Exception as e:
                logging.error(f"Errore nella richiesta di tutti i ritardi per tripId {tripId}: {e}")
                sleep(5)  # Attendi un po' prima di riprovare
            
        while True:
            try:
                insertStopDelays(mongo, delayRecords, stopTimes, routeName, routeId, direction)
                break
            except Exception as e:
                logging.error(f"errore in insertStopDelays {routeId}: {e}")
                sleep(5)  # Attendi un po' prima di riprovare

        while True:
            try:
                mongo.deleteByTripId(tripId)
                mongo.remove_tracked_bus(tripId)
                break
            except Exception as e:
                logging.error(f"Errore nella cancellazione del viaggio per tripId {tripId}: {e}")
                sleep(5)  # Attendi un po' prima di riprovare

def insertStopDelays(mongo, delayRecords, stopTimes, routeName, routeId, direction):
    for stop in stopTimes:
        delayAssociated = None
        for delayRecord in delayRecords:
            if stop['stopId'] == delayRecord['lastStop']:
                delayAssociated = delayRecord['delay']
                break

        if delayAssociated is None:
            continue

        stopDelayObject = {
            "stopId": stop['stopId'],
            "stopSequence": stop['stopSequence'],
            "stopTime": stop['arrivalTime'],
            "routeName": routeName,
            "routeId": routeId,
            "direction": direction,
            "tripId": stop['tripId'],
            "delay": delayAssociated
        }
        mongo.insert_stop_delay(stopDelayObject)

if __name__ == "__main__":
    main()


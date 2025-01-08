from mongo_client import MongoDBClient
from tntrasporti_client import TNTrasportiClient
from datetime import datetime
from time import sleep

def main():
    
    # 539 route id del 4
    tnClient = TNTrasportiClient()
    mongo = MongoDBClient()
    trackedbus = mongo.get_all_tracked_bus()
    
    for t in trackedbus:
        tripId = t['tripId']
        trip = tnClient.get_trip_details(tripId)
        stopTimes = trip['stopTimes']

        routeName = trip['tripHeadsign']
        routeId = trip['routeId']
        direction = trip['directionId']
        startTripTime = stopTimes[0]['arrivalTime']
        endTripTime = stopTimes[-1]['arrivalTime']
        date = datetime.utcnow().isoformat() + "Z"

        # TRIP INFO
        averageDelay = mongo.getAverageDelayByTripId(tripId)
        if averageDelay is not None:
            mongo.insert_trip_info(routeName, routeId, direction, date, tripId, startTripTime, endTripTime, averageDelay)
        
        delayRecords = mongo.getAllDelaysByTripId(tripId)
            
        insertStopDelays(mongo, delayRecords, stopTimes, routeName, routeId, direction)

        mongo.deleteByTripId(tripId)
        mongo.remove_tracked_bus(tripId)

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


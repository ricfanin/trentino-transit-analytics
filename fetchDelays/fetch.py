from mongo_client import MongoDBClient
from tntrasporti_client import TNTrasportiClient
from time import sleep
import logging

# Configura il logging
logging.basicConfig(filename='fetch.log', level=logging.INFO, format='%(asctime)s %(message)s')

# Funzione principale
def main():
    
    # 539 route id del 4
    tnClient = TNTrasportiClient()
    mongo = MongoDBClient()
    routes = [539, 396, 400, 402, 404, 411, 406, 408, 415, 536, 466]

    while True:
        try:
            for route in routes:
                try:
                    trips = tnClient.get_trips_by_route_today(route)
                except Exception as e:
                    logging.error(f"Errore nella richiesta dei viaggi per la routeId {route}: {e}")
                    continue

                for t in trips:
                    if len(t['stopTimes']) == 0:
                        break

                    tripId = t['stopTimes'][0]['tripId']
                    mongo.insert_bus_status(tripId, t['stopLast'], t['delay'])
                    if not mongo.find_tracked_bus(tripId):
                        mongo.add_tracked_bus(tripId)

            sleep(60)
        except Exception as e:
            logging.error(f"Errore nel ciclo principale: {e}")
            sleep(10)  # Attendi un po' prima di riavviare il ciclo


# Esegue la funzione principale
if __name__ == "__main__":
    main()


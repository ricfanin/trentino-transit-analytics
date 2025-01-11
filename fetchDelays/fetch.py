from mongo_client import MongoDBClient
from tntrasporti_client import TNTrasportiClient
from time import sleep

# Funzione principale
def main():
    
    # 539 route id del 4
    tnClient = TNTrasportiClient()
    mongo = MongoDBClient()
    routesIds = [539, 369, 400, 402, 404, 411]

    while True:
        
        for routeId in routesIds:
            trips = tnClient.get_trips_by_route_today(routeId)

            for t in trips:
                if len(t['stopTimes']) == 0:
                    break

                tripId = t['stopTimes'][0]['tripId']
                mongo.insert_bus_status(tripId, t['stopLast'], t['delay'])
                if not mongo.find_tracked_bus(tripId):
                    mongo.add_tracked_bus(tripId)
                    print("aggiunto ai trackedbus", tripId)
                

        sleep(60)
        


# Esegue la funzione principale
if __name__ == "__main__":
    main()


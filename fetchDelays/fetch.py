from mongo_client import MongoDBClient
from tntrasporti_client import TNTrasportiClient

# Funzione principale
def main():
    
    # 539 route id del 4
    tnClient = TNTrasportiClient()
    trips = tnClient.get_trips_by_route_today(539)

    mongo = MongoDBClient()
    
    for t in trips:
        if len(t['stopTimes']) == 0:
            break
        mongo.insert_bus_status("4", 539, t['stopTimes'][0]['tripId'], t['stopLast'], t['delay'])
        
    # routes = get_routes()

    # for r in routes:
    #     get_trips_by_route_today(r["routeId"])

    # get_stops()


# Esegue la funzione principale
if __name__ == "__main__":
    main()


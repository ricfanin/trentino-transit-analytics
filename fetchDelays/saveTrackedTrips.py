from mongo_client import MongoDBClient
from tntrasporti_client import TNTrasportiClient
from datetime import datetime
from time import sleep

# Funzione principale
def main():
    
    # 539 route id del 4
    tnClient = TNTrasportiClient()
    mongo = MongoDBClient()
    trackedbus = mongo.get_all_tracked_bus()
    
    for t in trackedbus:
        tripId = t['tripId']
        trip = tnClient.get_trip_details(tripId)

        routeName = trip['tripHeadsign']
        routeId = trip['routeId']
        direction = trip['directionId']
        startTripTime = trip['stopTimes'][0]['arrivalTime']
        endTripTime = trip['stopTimes'][-1]['arrivalTime']
        date = datetime.utcnow().isoformat() + "Z"

        delay = mongo.getAverageDelayByTripId(tripId)
        mongo.insert_trip_info(routeName, routeId, direction, date, tripId, startTripTime, endTripTime, delay)

        mongo.deleteByTripId(tripId)
        mongo.remove_tracked_bus(tripId)




    # routes = get_routes()

    # for r in routes:
    #     get_trips_by_route_today(r["routeId"])

    # get_stops()


if __name__ == "__main__":
    main()


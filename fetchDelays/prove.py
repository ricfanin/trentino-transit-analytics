from mongo_client import MongoDBClient
from tntrasporti_client import TNTrasportiClient
from datetime import datetime
from time import sleep

# Funzione principale
def main():
    
    # 539 route id del 4
    tnClient = TNTrasportiClient()
    trip = tnClient.get_trip_details('0004202332024090920250612')
    # routes = get_routes()

    # for r in routes:
    #     get_trips_by_route_today(r["routeId"])

    # get_stops()


if __name__ == "__main__":
    main()


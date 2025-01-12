from mongo_client import MongoDBClient
from tntrasporti_client import TNTrasportiClient

# Funzione principale
def main():
    tnClient = TNTrasportiClient()
    mongo = MongoDBClient()

    routes = [
        {"routeId": 539, "routeNumber": 4},
        {"routeId": 369, "routeNumber": 3},
        {"routeId": 400, "routeNumber": 5},
        {"routeId": 402, "routeNumber": 7},
        {"routeId": 404, "routeNumber": 8},
        {"routeId": 411, "routeNumber": 12},
        {"routeId": 406, "routeNumber": 9},
        {"routeId": 408, "routeNumber": 10},
        {"routeId": 415, "routeNumber": 14},
        {"routeId": 536, "routeNumber": 1},
        {"routeId": 466, "routeNumber": 13},
    ]

    for route in routes:
        mongo.insert_route_idNum(route)

if __name__ == "__main__":
    main()

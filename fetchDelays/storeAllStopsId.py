from mongo_client import MongoDBClient
from tntrasporti_client import TNTrasportiClient

# Funzione principale
def main():
    
    # 539 route id del 4
    tnClient = TNTrasportiClient()
    mongo = MongoDBClient()

    stops = tnClient.get_stops()
    
    for stop in stops:
        stopObj = {
            "stopId": stop['stopId'],
            "stopName": stop['stopName']
        }
        mongo.insert_stop_name(stopObj)

if __name__ == "__main__":
    main()

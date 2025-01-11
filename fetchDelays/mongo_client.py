from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import mongoModel
        
class MongoDBClient:

    
    DELAY_COLLECTION_NAME = "delays"
    TRIPS_COLLECTION_NAME = "tripsAverageDelay"
    TRACKED_COLLECTION_NAME = "busTracked"
    STOPS_COLLECTION_NAME = "stopDelays"
    STOPSNAMES_COLLECTION_NAME = "stopNames"

    def __init__(self, db_name='tnTA', host='localhost', port=27017):
        try:
            self.client = MongoClient(host, port)
            self.db = self.client[db_name]           
            self.delayCollection = self.db[self.DELAY_COLLECTION_NAME]
            self.trackedCollection = self.db[self.TRACKED_COLLECTION_NAME]
            self.tripInfoCollection = self.db[self.TRIPS_COLLECTION_NAME]
            self.stopDelaysCollection = self.db[self.STOPS_COLLECTION_NAME]
            self.stopNamesCollection = self.db[self.STOPSNAMES_COLLECTION_NAME]
            print("Connessione al database stabilita.")
        except ConnectionFailure as e:
            print(e)

    ###################
    ##### DELAYS  #####
    ###################
    def insert_bus_status(self, tripId, lastStop, delay):
        """
        Inserisce lo stato di un bus
        """
        esisteBusStatus = self.find_bus_status(tripId, lastStop)
        if esisteBusStatus:
            print("busStatus con lo stesso tripId e lastStop esiste gia. Inserimento non eseguito.")
            return

        busStatus = mongoModel.busStatusModel(tripId, lastStop, delay)
        print("busStatus inserito con successo.")
        self.delayCollection.insert_one(busStatus)

    def find_bus_status(self, tripId, lastStop):
        """
        Cerca un busstatus con un tripId e lastStop specifici.
        """
        filtro = {"tripId": tripId, "lastStop": lastStop}
        return self.delayCollection.find_one(filtro)

    def getAverageDelayByTripId(self, tripId):
        """
        fa la media di tutti i record con tripId uguale al parametro
        """
        pipeline = [
            {"$match": {"tripId": tripId}},  # Filtra per il tripId
            {"$group": {"_id": None, "averageDelay": {"$avg": "$delay"}}}  # Calcola la media del delay
        ]
        result = list(self.delayCollection.aggregate(pipeline))
        if result:
            return result[0]["averageDelay"]
        else: 
            return None

    def deleteByTripId(self, tripId):
        """
        cancella record con quel tripId
        """
        self.delayCollection.delete_many({"tripId": tripId})
    
    def getAllDelaysByTripId(self, tripId):
        filtro = {"tripId": tripId}
        result = self.delayCollection.find(filtro)
        if result:
            return result
        else: 
            return None
    
        
    ###################
    ##### TRACKED #####
    ###################
    def get_all_tracked_bus(self):
        return self.trackedCollection.find()

    def find_tracked_bus(self, tripId):
        filtro = {"tripId": tripId}
        return self.trackedCollection.find_one(filtro)

    def add_tracked_bus(self, tripId):
        self.trackedCollection.insert_one({"tripId" : tripId})

    def remove_tracked_bus(self, tripId):
        self.trackedCollection.delete_one({"tripId" : tripId})

    ###################
    #### TRIP INFO ####
    ###################
    def insert_trip_info(self, routeName, routeId, direction, date, tripId, startTripTime, endTripTime, delay):
        """
        Inserisce lo stato di un bus
        """
        tripInfo = mongoModel.tripInfoModel(routeName, routeId, direction, date, tripId, startTripTime, endTripTime, delay)
        print("tripInfo inserito con successo.")
        self.tripInfoCollection.insert_one(tripInfo)
    
    def chiudi_connessione(self):
        """
        Chiude la connessione al database.
        """
        self.client.close()
        print("Connessione al database chiusa.")

    ###################
    ### STOP DELAYS ###
    ###################
    def insert_stop_delay(self, stopDelayObject):
        """
        Inserisce uno stop delay
        """
        self.stopDelaysCollection.insert_one(stopDelayObject)
        print("stopDelay inserito con successo.")


    ###################
    ### STOP NAMES ###
    ###################

    def insert_stop_name(self, stopIdNameObject):
        """
        Inserisce uno stop con id e nome
        """
        self.stopNamesCollection.insert_one(stopIdNameObject)
        print("stopName inserito con successo.")
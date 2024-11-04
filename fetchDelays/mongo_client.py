from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
        
class MongoDBClient:
    def __init__(self, db_name='tnTA', collection_name='delays', host='localhost', port=27017):
        try:
            self.client = MongoClient(host, port)
            self.db = self.client[db_name]           
            self.collection = self.db[collection_name]
            print("Connessione al database stabilita.")
        except ConnectionFailure as e:
            print(f"Errore di connessione a MongoDB: {e}")

    def busStatus(self, routeName, routeNumber, tripId, lastStop, delay):
        return {
            "routeName": routeName,
            "routeNumber": routeNumber,
            "tripId": tripId,
            "lastStop": lastStop,
            "delay": delay,
        }

    def insert_bus_status(self, routeName, routeNumber, tripId, lastStop, delay):
        """
        Inserisce lo stato di un bus
        """
        esisteBusStatus = self.find_bus_status(tripId, lastStop)
        if esisteBusStatus:
            print("busStatus con lo stesso tripId e lastStop esiste già. Inserimento non eseguito.")
            return

        busStatus = self.busStatus(routeName, routeNumber, tripId, lastStop, delay)
        self.collection.insert_one(busStatus)
        print("busStatus inserito con successo.")

    def find_bus_status(self, tripId, lastStop):
        """
        Cerca un busstatus con un tripId e lastStop specifici.
        """
        filtro = {"tripId": tripId, "lastStop": lastStop}
        return self.collection.find_one(filtro)

    def chiudi_connessione(self):
        """
        Chiude la connessione al database.
        """
        self.client.close()
        print("Connessione al database chiusa.")

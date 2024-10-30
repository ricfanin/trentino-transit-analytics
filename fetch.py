import requests
from requests.auth import HTTPBasicAuth
import json
import os
from datetime import datetime

# URL di base e credenziali per l'autenticazione
BASE_URL = "https://app-tpl.tndigit.it/gtlservice"
auth = HTTPBasicAuth("mittmobile", "ecGsp.RHB3")

# Crea una cartella di output se non esiste
OUTPUT_DIR = "output"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Funzione per salvare i dati JSON in un file
def save_json(data, filename):
    file_path = os.path.join(OUTPUT_DIR, filename)
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)
    print(f"Dati salvati in {file_path}")

# Funzione per ottenere la lista delle fermate
def get_stops(size=40, stop_type="U"):
    url = f"{BASE_URL}/stops"
    params = {"size": size, "type": stop_type}
    response = requests.get(url, auth=auth, params=params)
    stops = response.json()
    save_json(stops, "stops.json")
    return stops

# Funzione per ottenere le linee di trasporto
def get_routes():
    url = f"{BASE_URL}/routes"
    params = {"areas": 23}
    response = requests.get(url, auth=auth, params=params)
    routes = response.json()
    save_json(routes, "routes.json")
    return routes

# Funzione per ottenere le corse di una fermata specifica
def get_trips_by_stop(stop_id, stop_type="U", limit=5):
    url = f"{BASE_URL}/trips_new"
    params = {
        "stopId": stop_id,
        "type": stop_type,
        "limit": limit
    }
    response = requests.get(url, auth=auth, params=params)
    trips = response.json()
    filename = f"trips_stop_{stop_id}.json"
    save_json(trips, filename)
    return trips

def get_trips_by_route_today(route_id, stop_type="U"):
    url = f"{BASE_URL}/trips_new"
    # Data corrente nel formato richiesto (yyyy-mm-dd)
    # current_datetime_iso = datetime.utcnow().isoformat() + "Z"
    params = {
        "routeId": route_id,
        "type": stop_type,
        "refDateTime": "2024-10-30T13:34:00Z",
        "limit": 2,
        # "directionId": 0, # 0 andata 1 ritorno
    }
    response = requests.get(url, auth=auth, params=params)
    trips_today = response.json()
    filename = f"trips_route_{route_id}.json"
    save_json(trips_today, filename)
    return trips_today

# Funzione per ottenere i dati di una corsa specifica tramite tripId
def get_trip_details(trip_id):
    url = f"{BASE_URL}/trips/{trip_id}"
    response = requests.get(url, auth=auth)
    trip_details = response.json()
    filename = f"trip_details_{trip_id}.json"
    save_json(trip_details, filename)
    return trip_details

# Funzione principale
def main():
    
    # 539 route id del 4
    # get_trips_by_route_today(539)
    
    # routes = get_routes()

    # for r in routes:
    #     get_trips_by_route_today(r["routeId"])

    # get_stops()


# Esegue la funzione principale
if __name__ == "__main__":
    main()


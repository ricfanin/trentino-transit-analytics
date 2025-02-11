import requests
from requests.auth import HTTPBasicAuth
import json
import os
from datetime import datetime
from pymongo import MongoClient

class TNTrasportiClient:
    BASE_URL = "https://app-tpl.tndigit.it/gtlservice"
    OUTPUT_DIR = "output"

    def __init__(self):
        os.makedirs(self.OUTPUT_DIR, exist_ok=True)
        self.auth = HTTPBasicAuth("mittmobile", "ecGsp.RHB3")

    def save_json(self, data, filename):
        file_path = os.path.join(self.OUTPUT_DIR, filename)
        with open(file_path, "w") as f:
            json.dump(data, f, indent=4)
        print(f"Dati salvati in {file_path}")

    def get_stops(self, size=40, stop_type="U"):
        url = f"{self.BASE_URL}/stops"
        params = {"type": stop_type}
        response = requests.get(url, auth=self.auth, params=params)
        stops = response.json()
        return stops

    def get_routes(self):
        url = f"{self.BASE_URL}/routes"
        params = {"areas": 23}
        response = requests.get(url, auth=self.auth, params=params)
        routes = response.json()
        self.save_json(routes, "routes.json")
        return routes

    def get_trips_by_stop(self, stop_id, stop_type="U", limit=5):
        url = f"{self.BASE_URL}/trips_new"
        params = {
            "stopId": stop_id,
            "type": stop_type,
            "limit": limit,
        }
        response = requests.get(url, auth=self.auth, params=params)
        trips = response.json()
        filename = f"trips_stop_{stop_id}.json"
        self.save_json(trips, filename)
        return trips

    def get_trips_by_route_today(self, route_id, stop_type="U", direction_id=None):
        url = f"{self.BASE_URL}/trips_new"
        current_datetime_iso = datetime.utcnow().isoformat() + "Z"
        params = {
            "routeId": route_id,
            "type": stop_type,
            "refDateTime": current_datetime_iso,
            "limit": 2,
        }
        if direction_id is not None:
            params["directionId"] = direction_id  # 0 per andata, 1 per ritorno
        response = requests.get(url, auth=self.auth, params=params)
        trips_today = response.json()
        filename = f"trips_route_{route_id}.json"
        return trips_today

    def get_trip_details(self, trip_id):
        url = f"{self.BASE_URL}/trips/{trip_id}"
        response = requests.get(url, auth=self.auth)
        trip_details = response.json()
        filename = f"trip_details_{trip_id}.json"
        return trip_details

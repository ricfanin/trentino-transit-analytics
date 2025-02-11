def busStatusModel(tripId, lastStop, delay):
    return {
        "tripId": tripId,
        "lastStop": lastStop,
        "delay": delay,
    }
def tripInfoModel(routeName, routeId, direction, date, tripId, startTripTime, endTripTime, delay):
    return {
        "routeName": routeName,
        "routeId": routeId,
        "direction": direction,
        "date": date,
        "tripId": tripId,
        "startTripTime": startTripTime,
        "endTripTime": endTripTime,
        "delay": delay,
    }
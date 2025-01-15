# Bus Tracking System

In questa cartella ci sono gli script Python che raccolgono dati dalle API di trentino trasporti e li carica in un database MongoDB per monitorare lo stato dei bus e calcolare ritardi medi. Il sistema è composto da due script principali:

- `fetch.py`: eseguito continuamente per raccogliere e salvare i dati dei bus in tempo reale.
- `saveTrackedTrips.py`: eseguito una volta al giorno per elaborare i dati salvati, calcolare statistiche e pulire il database.

## Flusso di lavoro

### `fetch.py`

1. Utilizza la classe `TNTrasportiClient` per richiedere all'API l'elenco dei viaggi (`trips`) attivi per le varie linee di bus.
2. Per ogni viaggio, verifica se esistono informazioni di stato già presenti nel database (MongoDB) tramite la collection `delays`.
3. Salva i dati del viaggio (ad esempio `tripId`, ultima fermata raggiunta, ritardo) in MongoDB se non sono già presenti.
4. Aggiunge il viaggio alla lista dei bus monitorati nella collection `busTracked` se non è già tracciato.
5. Ripete il processo ogni minuto per garantire il monitoraggio continuo dei dati in tempo reale.

### `saveTrackedTrips.py`

1. Recupera tutti i bus tracciati dalla collection `busTracked`.
2. Per ogni bus tracciato:
   - Ottiene i dettagli del viaggio (`tripDetails`) tramite `TNTrasportiClient`.
   - Calcola il ritardo medio (`averageDelay`) di quel viaggio utilizzando la collection `delays`.
   - Salva le informazioni riepilogative del viaggio (ad esempio nome della linea, orario di inizio/fine viaggio) nella collection `tripsAverageDelay`.
   - Analizza i ritardi associati alle fermate del viaggio e li salva nella collection `stopDelays`.
3. Cancella i dati relativi al viaggio da `delays` e `busTracked` per evitare ridondanza.

## Database MongoDB: Struttura e Utilizzo delle Collection

### 1. `delays`
- **Scopo:** Memorizza i dati di stato in tempo reale di ogni viaggio, inclusi ritardi e l'ultima fermata raggiunta.
- **Campi principali:**
  - `tripId`: ID del viaggio.
  - `lastStop`: ID dell'ultima fermata raggiunta.
  - `delay`: Ritardo del bus in secondi.
- **Utilizzo:**
  - Popolata da `fetch.py` con i dati raccolti in tempo reale.
  - Analizzata da `saveTrackedTrips.py` per calcolare i ritardi medi e ritardi per fermata.

---

### 2. `busTracked`
- **Scopo:** Contiene la lista dei bus attualmente monitorati per evitare duplicazione dei dati.
- **Campi principali:**
  - `tripId`: ID del viaggio.
- **Utilizzo:**
  - Popolata da `fetch.py` quando un nuovo viaggio viene trovato.
  - Pulita da `saveTrackedTrips.py` dopo l'elaborazione dei dati del viaggio.

---

### 3. `tripsAverageDelay`
- **Scopo:** Salva informazioni riepilogative dei viaggi, inclusi ritardi medi e orari di inizio/fine.
- **Campi principali:**
  - `routeName`: Nome della linea di trasporto.
  - `routeId`: ID della linea.
  - `direction`: Direzione del viaggio.
  - `date`: Data del viaggio.
  - `tripId`: ID del viaggio.
  - `startTripTime`: Orario di inizio viaggio.
  - `endTripTime`: Orario di fine viaggio.
  - `delay`: Ritardo medio del viaggio.
- **Utilizzo:**
  - Popolata da `saveTrackedTrips.py` con dati elaborati.

---

### 4. `stopDelays`
- **Scopo:** Registra i ritardi associati a ciascuna fermata per ogni viaggio.
- **Campi principali:**
  - `stopId`: ID della fermata.
  - `stopSequence`: Sequenza della fermata nel percorso.
  - `stopTime`: Orario pianificato di arrivo alla fermata.
  - `routeName`: Nome della linea.
  - `routeId`: ID della linea.
  - `direction`: Direzione del viaggio.
  - `tripId`: ID del viaggio.
  - `delay`: Ritardo registrato alla fermata.
- **Utilizzo:**
  - Popolata da `saveTrackedTrips.py` durante l'elaborazione delle fermate di un viaggio.

## Installazione e Configurazione

1. **Prerequisiti:**
   - Python 3.x
   - MongoDB in esecuzione su `localhost:27017` (modificabile in `MongoDBClient`).

2. **Installare le dipendenze Python:**
   ```bash
   pip install pymongo

## Esecuzione e Automazione

### `fetch.py`
Lo script `fetch.py` deve essere eseguito continuamente per monitorare i dati in tempo reale. Si consiglia di avviarlo in una sessione `screen` per mantenerlo attivo anche dopo la chiusura del terminale.

1. Avvia una nuova sessione `screen`:
   ```bash
   screen -S fetch
   ```

2. Cambia directory e avvia lo script:
   ```bash
   cd /percorso/alla/cartella
   python3 fetch.py
   ```

3. Per uscire dalla sessione `screen` senza interrompere lo script, premi `Ctrl+A` seguito da `D`. Puoi rientrare nella sessione con:
   ```bash
   screen -r fetch
   ```

---

### `saveTrackedTrips.py`
Lo script `saveTrackedTrips.py` deve essere eseguito automaticamente ogni giorno alle 2:00 di notte per elaborare i dati raccolti (alle 2 di notte è meglio così tutti i bus della giornata hanno finito di girare). Questo può essere configurato usando `cron`:

1. Apri il file crontab:
   ```bash
   crontab -e
   ```

2. Aggiungi questa riga per eseguire lo script ogni giorno alle 2:00:
   ```bash
   0 2 * * * cd ~/trentino-transit-analytics/fetchDelays && python3 ~/trentino-transit-analytics/fetchDelays/saveTrackedTrips.py
   ```

3. Salva e chiudi il file. Da ora in poi, lo script verrà eseguito automaticamente all'orario specificato, e l'output verrà registrato nel file `saveTrackedTrips.log` nella cartella fetchDelays.
```
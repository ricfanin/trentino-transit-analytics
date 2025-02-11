# Trentino Transit Analytics

## Live Demo
- **Main Site (Backend):** [https://trentino-transit-analytics.onrender.com](https://trentino-transit-analytics.onrender.com)
- **Frontend:** [https://trentino-transit-analytics-1.onrender.com](https://trentino-transit-analytics-1.onrender.com)
- **Test Reports:** [https://trentino-transit-analytics-test.onrender.com](https://trentino-transit-analytics-test.onrender.com)

![image](https://github.com/user-attachments/assets/18d24fe5-1083-4410-a368-9cb890977fd3)

![image](https://github.com/user-attachments/assets/70dd0a80-8b8c-48ee-857d-e8494f5d7427)

![image](https://github.com/user-attachments/assets/6b48cc5f-066c-4999-9433-891d4a432f12)

### Deliverables

<div style="display: flex; justify-content: space-between; align-items: center;">
  <a href="https://drive.google.com/file/d/1qfltqPb_56GXUbUl-tzbCN1Tqto7DacA/view?usp=sharing" style="text-decoration: none;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Pdf_icon.png" alt="PDF Icon" width="50">
    D1         
  </a>
  <a href="https://drive.google.com/file/d/1RR_OFPVMmgxl4oea_29s0dr5llL_Ik1H/view?usp=sharing" style="text-decoration: none;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Pdf_icon.png" alt="PDF Icon" width="50">
    D2         
  </a>
  <a href="https://drive.google.com/file/d/1Gx8wYKDbfTR-W7d7Sv9fkzGNmNDqpGQa/view?usp=sharing" style="text-decoration: none;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Pdf_icon.png" alt="PDF Icon" width="50">
    D3         
  </a>
  <a href="https://drive.google.com/file/d/1QhBiavww03Z8PkTMOwsUKH_HIT_6JEgM/view?usp=sharing" style="text-decoration: none;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Pdf_icon.png" alt="PDF Icon" width="50">
    D4         
  </a>
</div>

---
## Brief Description
Trentino Transit Analytics è una piattaforma sviluppata con lo stack MEVN (MongoDB, Express.js, Vue.js, Node.js) che offre una zona social per la gestione e l'interazione con contenuti (post, commenti, ecc.) e una sezione di analisi per visualizzare grafici interattivi relativi ai dati di transit. Il sistema prevede un'autenticazione sicura tramite JWT, ruoli differenziati per utenti e operatori e un'interfaccia utente moderna e reattiva grazie a Tailwind CSS.

## Table of Contents
- [Project Overview](#project-overview)
- [Installation & Setup](#installation--setup)
- [Build & Deployment](#build--deployment)
- [Testing](#testing)
- [Authors](#authors)
- [License](#license)

## Project Overview
Il progetto è stato realizzato da **Joey Gheller**, **Tognato Mattia** e **Riccardo Fanin** per il corso di Ingegneria del Software all'Università degli Studi di Trento. L'obiettivo è creare una piattaforma scalabile e moderna che integri funzionalità social e analitiche, sfruttando tecnologie all'avanguardia e garantendo una gestione efficiente dei dati.

### Technology Stack
- **Backend:** Node.js, Express.js
- **Frontend:** Vue.js, Tailwind CSS
- **Database:** MongoDB (utilizzando Mongoose per la modellazione dei dati)
- **Autenticazione:** JSON Web Token (JWT)
- **Analytics:** Script in Python (cronjob su Raspberry Pi) e Chart.js per la visualizzazione dei dati
- **Deployment:** Render.com

## Installation & Setup

### Prerequisiti
- **Node.js** e **npm** installati sul sistema.
- **MongoDB** (locale o remoto) configurato e in esecuzione.

### Clonare il Repository

```bash
git clone https://github.com/ricfanin/trentino-transit-analytics.git
cd trentino-transit-analytics
```

### Configurazione del Backend

```bash
cd server
npm install
```

### Configurazione del Frontend

```bash
cd frontend
npm install
```

### Build & Deployment

#### Local Development

**Backend:**

Dalla cartella `server`, esegui:

```bash
npm run start
```

**Frontend:**

Dalla cartella `frontend`, esegui:

```bash
npm run serve
```
(oppure `npm run dev`, a seconda della configurazione)

### Testing

Per eseguire i test:

Vai nella cartella `server`:

```bash
cd server
```

Avvia i test:

```bash
npm test
```

Questo comando esegue sia i test unitari che quelli di integrazione e genera un report dettagliato sulla copertura del codice.

---

### Authors

Questo progetto è stato realizzato da:

- [Joey Gheller](https://github.com/JoeyGheller)
- [Tognato Mattia](https://github.com/Matwy)
- [Riccardo Fanin](https://github.com/ricfanin)

per il corso di Ingegneria del Software all'Università degli Studi di Trento.

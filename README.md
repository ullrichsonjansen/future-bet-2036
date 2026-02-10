# 🤖 Future Bet 2036 - KI-Zukunftswette

Eine Web-App für Zukunftswetten unter Freunden. Beantworte 10 Multiple-Choice-Fragen über die Zukunft der KI bis 2036 und vergleiche später die Antworten!

## 🎯 Features

- 🔐 Login mit persönlichem Secret Code
- 📝 10 durchdachte Multiple-Choice-Fragen
- 💬 Optionale Begründungen pro Frage
- ⏰ Countdown bis zur Deadline (20.02.2026)
- 📊 Live-Status: Wer hat schon abgestimmt?
- 🏆 Vergleichsansicht aller Antworten
- 🎨 Futuristisches Dark-Mode-Design
- 📱 Responsive (Desktop & Mobile)

## 🚀 Quick Start

### 1. Repository forken

Klicke auf "Use this template" oder fork dieses Repository.

### 2. Vercel Account erstellen

1. Gehe zu [vercel.com](https://vercel.com)
2. Klicke "Sign Up"
3. Wähle "Continue with GitHub"

### 3. Projekt deployen

1. In Vercel: "Add New" → "Project"
2. Wähle dein GitHub-Repository
3. Vercel erkennt automatisch die Konfiguration
4. Klicke "Deploy"
5. **Fertig!** Deine App ist live unter: `https://future-bet-2036.vercel.app`

### 4. Vercel KV Database einrichten

1. Im Vercel Dashboard → dein Projekt auswählen
2. Tab "Storage" → "Create Database"
3. Wähle "KV" (Redis)
4. Name: `future-bet-db`
5. Region: Wähle die nächstgelegene
6. Klicke "Create"
7. Vercel verbindet die DB automatisch!

### 5. Secret Codes an Teilnehmer schicken

Schicke jedem Teilnehmer seinen persönlichen Code:

```
Malin:      QUANTUM-7294
Veritas:    NEURAL-5831
Tyrantitar: FUSION-9156
Ulle:       MATRIX-4672
W4rhi:      CYBER-8403
```

**Link zur App:** `https://dein-projekt.vercel.app`

## 🔧 Lokal entwickeln

```bash
# Repository clonen
git clone https://github.com/dein-username/future-bet-2036.git
cd future-bet-2036

# Dependencies installieren
npm install

# Vercel CLI installieren (global)
npm i -g vercel

# Einloggen in Vercel
vercel login

# Link zum Projekt erstellen
vercel link

# Lokalen Dev-Server starten
vercel dev
```

Öffne: `http://localhost:3000`

## 📁 Projekt-Struktur

```
future-bet-2036/
├── public/              # Frontend
│   ├── index.html       # Login-Seite
│   ├── survey.html      # Fragen-Formular
│   ├── waiting.html     # Warte-Seite
│   ├── results.html     # Ergebnisse
│   └── admin.html       # Admin-Panel
├── api/                 # Backend (Serverless Functions)
│   ├── auth.js          # Login-Validierung
│   ├── submit.js        # Antworten speichern
│   ├── status.js        # Teilnahme-Status
│   ├── results.js       # Ergebnisse laden
│   ├── admin-unlock.js  # Results freischalten
│   ├── check-unlock.js  # Unlock-Status prüfen
│   └── check-submission.js  # Submission prüfen
├── package.json
├── vercel.json
└── README.md
```

## 🔐 Admin-Panel

**URL:** `https://dein-projekt.vercel.app/admin.html`

**Admin-Key:** `admin-future-bet-2036`

### Funktionen:
- ✅ Übersicht: Wer hat abgestimmt?
- 🔓 Button: Ergebnisse manuell freischalten

**Automatische Freischaltung:**
- Nach Deadline (20.02.2026 23:59:59)
- Oder wenn alle 5 Personen abgestimmt haben

## 🎨 Anpassungen

### Teilnehmer ändern

**Datei:** `api/auth.js`

```javascript
const SECRETS = {
  'neuer_name': 'NEUER-CODE',
  // ... weitere
};
```

**Auch anpassen in:**
- `api/status.js` (PARTICIPANTS Array)
- `api/results.js` (PARTICIPANTS Array)
- `public/index.html` (select options)

### Deadline ändern

**Überall ersetzen:**
```javascript
new Date('2026-02-20T23:59:59')
```

**Zu finden in:**
- `public/index.html`
- `public/waiting.html`
- `api/status.js`
- `api/check-unlock.js`
- `api/results.js`

### Design anpassen

Alle Farben sind in den `<style>`-Sections definiert:

```css
/* Hauptfarben */
#00f2ff  /* Cyan/Türkis */
#b24bf3  /* Lila/Magenta */
#0a0e27  /* Dunkelblau (Hintergrund) */
```

## 🐛 Troubleshooting

### "Nicht autorisiert" beim Login
- Secret Code korrekt? (Groß-/Kleinschreibung egal)
- Username korrekt?

### Antworten werden nicht gespeichert
- Vercel KV Database verbunden?
- Check in Vercel Dashboard → Storage

### Results werden nicht angezeigt
- Admin-Panel: Results freigeschaltet?
- Deadline erreicht?

### 500 Server Error
- Vercel Logs checken: Dashboard → dein Projekt → Logs
- Ist `@vercel/kv` package installiert?

## 📊 Daten exportieren

Über Vercel KV Dashboard kannst du alle Daten als JSON exportieren:

1. Vercel Dashboard → Storage → KV-Database
2. Browse Data
3. Alle Keys mit `submission:` beginnen
4. Values kopieren

## 🔒 Sicherheit

- Keine Passwörter in Git committen
- Secret Codes per DM verschicken (nicht öffentlich!)
- Admin-Key ändern für Production:
  - Vercel Dashboard → Settings → Environment Variables
  - `ADMIN_KEY` = dein-sicherer-key

## 📜 Lizenz

MIT License - Frei verwendbar!

## 💡 Credits

Erstellt mit Claude (Anthropic) für die Zocker-Crew! 🎮

---

**Viel Spaß beim Wetten auf die Zukunft!** 🚀🤖

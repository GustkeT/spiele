# Spiele
## Lokale Installation
Projekt aus git klonen:
Erstelle Verzeichnis für die Arbeitskopie.
In Git Bash (Explorer-Kontextmenu) dahin wechseln.
`git clone https://github.com/GustkeT/spiele.git`

In Kommandozeile in /api wechseln und dort
`npm install`
ausführen.
Mit `nodemon` API starten.


In Kommandozeile in /my-client wechseln und dort
`npm install`
ausführen.
Mit `npm start` Client starten.

Im Standard-Browser öffnet sich die App.

## Docker-Installation auf DiskStation

![overview](https://github.com/GustkeT/spiele/blob/master/Spiele.jpg)

Als admin via PuTTY auf DiskStation einloggen und zum Verzeichnis "spiele" wechseln:
```
>pwd
/var/services/homes/admin

>cd github/spiele
```

Source code aus GitHub aktualisieren:
```
>sudo git pull
```

Falls Container laufen, diese stoppen und entfernen:
```
>sudo docker-compose down
```

spiele-api-Image erstellen:
```
>cd api
>sudo docker build -t spiele-api .
```

spiele-client-Image erstellen:
```
>cd ../my-client
>sudo docker build -t spiele-client .
```

Container starten:
```
>sudo docker-compose up -d
```

Die Anwendung sollte nun unter http://192.168.178.80:8091 aufrufbar sein.


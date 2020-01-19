# Vorbereitung
(https://www.youtube.com/watch?v=30Vg6FTMK0A)
* Erstelle Projektordner z.B. "pod1"
* Erstelle eine leere JavaScript Datei z.B. "api.js"
* Öffne "Node.js command prompt" und gehe zum Projektordner
* `npm init`
Es wird eine package.json Datei erstellt:
```
{
  "name": "spiele",
  "version": "1.0.0",
  "description": "Unsere Brettspiele",
  "main": "api.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",  
}
```
* Danach installiert man des PostgreSQL Modul mit `npm install --save pg`. Die package.json Datei sieht jetzt so aus:
```
{
  "name": "spiele",
  "version": "1.0.0",
  "description": "Unsere Brettspiele",
  "main": "api.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "pg": "^7.4.3"
  }
}
```

# PostgreSQL Datenbank
* Erstelle eine Datenbank in postgres z.B. Datenbankname="spiele" mit dem pgAdmin
* Erstelle die benötigten Tabellen in der DB z.B. unserespiele
* Erstelle einen User für den Datenbankzugriff
* Der User muss die Rechte (privileges) auf die DB und die Tabellen bekommen

# Verbindung zur DB
* Bearbeite die api.js:
```
{
  var Pool=require('pg').Pool;
  var config={
    host:'localhost',
    user:'spieler',
    password:'spiel',
    database:'spiele',
    port:5433,
    dialect:"postgres"
  };

  var pool =new Pool(config);

  async function get_hits(){
    try{
      var response = await pool.query("select * from unserespiele");
      console.log(response.rows);
    }
    catch(e){
      console.error("MY ERROR", e);
    }
  }

  get_hits();
}
```

# Ausprobieren
* Tippe auf der Konsole:  `node api.js`
* Es sollte folgendes zu sehen sein:
```
[ { id: '6',
    titel: 'Adel verpflichtet                                               ',
    jahr: 1990,
    mitspieler: 5,
    dauer: 60,
    spieldesjahres: 1,
    autor: 'Klaus Teuber                                                    ' },
  { id: '7',
    titel: 'Wer war\'s?                                                      ',
    jahr: 2008,
    mitspieler: 4,
    dauer: 30,
    spieldesjahres: 2,
    autor: 'Reiner Knizia                                                   ' },
  .......
  .......
  { id: '5',
    titel: 'Abalone                                                         ',
    jahr: 1988,
    mitspieler: 2,
    dauer: 45,
    spieldesjahres: null,
    autor: 'Michael Lalet und Laurent Levi                                  ' } ]
```

# Webserver vorbereiten
(https://www.youtube.com/watch?v=qZsRZ3PWvEY)
* Wir verwenden express `npm install --save express`
* Wir verwenden body-parser `npm install --save body-parser`
* Die package.json sieht dann so aus:
```
{
  "name": "spiele",
  "version": "1.0.0",
  "description": "Unsere Brettspiele",
  "main": "api.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.18.3",
    "express": "^4.16.3",
    "pg": "^7.4.3"
  }
}
```

# Webserver nutzen
* Den Code in api.js wie folgt ändern:
```
  const express = require('express');
  var Pool = require('pg').Pool;
  var bodyParser = require('body-parser');
  const app = express();
  var config = {
    host:'localhost',
    user:'spieler',
    password:'spiel',
    database:'spiele',
    port:5433,
    dialect:"postgres"
  };

  var pool = new Pool(config);
  app.set('port', (8080)); // definiere den port
  app.use(bodyParser.json({type: 'application/json'})); // der body der response wird als json erwartet
  app.use(bodyParser.urlencoded({extended: true}));

  //Definiere die API route "/spiele" und mappe den GET request auf den SQL-Befehl
  app.get('/spiele', async (req, res) => {
    try{
      var response = await pool.query("select * from unserespiele");
      console.log(JSON.stringify(response.rows));
      res.json (response.rows);
    }
    catch(e){
      console.error('Error running query ' + e);
    }
  });

  //Starte den Webserver
  app.listen(app.get('port'), () => {
    console.log('Running');
  })
```

# Im Browser ausprobieren
* Starte den Node server mit `node api.js`
* Gehe auf den browser und tippe: http://localhost:8080/spiele
* es sollte die gleiche Liste zu sehen sein, diesmal im Browser.

# Hinzufügen und löschen von Datensätzen in der DB
(https://www.youtube.com/watch?v=Am7OUiJWo9A)
* Ergänze den Code um die Endpunkte post und delete:
## POST
```
app.post('/spiele', async(req, res) => {
  console.log(req.body);
  var titel = req.body.titel;
  var jahr = req.body.jahr;
  var mitspieler = req.body.mitspieler;
  var dauer = req.body.dauer;
  var spieldesjahres = req.body.spieldesjahres;
  var autor = req.body.autor;

  if(!titel) {
    res.json({error:'title not given'});
  }
  else {
    try {
      var response = await pool.query('insert into unserespiele (titel, jahr, mitspieler, dauer, spieldesjahres, autor) values ($1, $2, $3, $4, $5, $6)', [titel, jahr, mitspieler, dauer, spieldesjahres, autor]);
      res.json({status: 'inserted'});
    }
    catch(e){
      console.error('Error running insert ' + e);
    }

  }
})
```
## DELETE
```
app.delete('/spiele', async(req, res) => {
  console.log(req.body);
  var titel = req.body.titel;
  var jahr = req.body.jahr;
  var mitspieler = req.body.mitspieler;
  var dauer = req.body.dauer;
  var spieldesjahres = req.body.spieldesjahres;
  var autor = req.body.autor;

  if(!titel) {
    res.json({error:'title not given'});
  }
  else {
    try {
      var response = await pool.query('delete from unserespiele where titel = $1', [titel]);
      res.json({status: 'deleted'});
    }
    catch(e){
      console.error('Error running delete ' + e);
    }

  }
})
```

# Endpunkt um nur ein Spiel zu bekommen
```
//Definiere die API route "/spiele/{id}" und mappe den GET request auf den SQL-Befehl
app.get('/spiele/:id', async (req, res) => {
  console.log('get mit id');
  try{
    var response = await pool.query("select * from unserespiele where id = $1", [req.params.id]);
    console.log(JSON.stringify(response.rows));
    res.json (response.rows);
  }
  catch(e){
    console.error('Error running query ' + e);
  }
});
```

# Wie man nodemon benutzt
* Nodemon benutzt man, damit man nicht jedes mal den Server stoppen uns starten muss, wenn sich der Code ändert.
* Zuerst muss das Paket installiert werden: `npm install -g nodemon`
* Danach startet man den Server nicht mit `node api.js` sondern mit `nodemon api.js`


# Input parameter validieren
Man kann mithilfe des Pakets "Joi" ein Schema definieren und in der POST Funktion validieren. Mehr dazu in https://www.youtube.com/watch?v=pKd0Rpw7O48 (ca Minute 40)
* Installiere das Joi Paket: `npm install --save joi`
* Benutze das Joi im Code: `const Joi = require('joi');`
* Schreibe eine Funktion die nach einem definierten Schema validiert:
```
function validateSpiel(spiel){
  const schema = {
    titel : Joi.string().required(),
    jahr : Joi.number().integer().min(1900).max(2100),
    mitspieler : Joi.number().integer().min(1),
    dauer : Joi.number().integer(),
    spieldesjahres : Joi.number().integer(),
    autor : Joi.string(),
  };

  return Joi.validate(spiel, schema);
}
```
* Rufe diese Funktion auf wo immer du validieren willst, z.B. in der POST und PUT Methode:
```
app.put('/spiele/:id', async(req, res) => {
  console.log(req.body);

  // Look up the spiel
  var response = await pool.query("select * from unserespiele where id = $1", [req.params.id]);

  // If not existing, return 404
  if(response.rowCount === 0){
    res.status(404).send('Das Spiel hast Du nicht!');
    return;
  }

  // Validate
  const { error } = validateSpiel(req.body);

  // If invalid, return 400 - Bad request
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }

  // Update spiel
  // Return the updated spiel
  var titel = req.body.titel;
  var jahr = req.body.jahr;
  var mitspieler = req.body.mitspieler;
  var dauer = req.body.dauer;
  var spieldesjahres = req.body.spieldesjahres;
  var autor = req.body.autor;

  try {
    var response = await pool.query('UPDATE unserespiele SET titel = $1, jahr = $2, mitspieler = $3, dauer = $4, spieldesjahres = $5, autor = $6 WHERE id = $7', [titel, jahr, mitspieler, dauer, spieldesjahres, autor, req.params.id]);
    res.json({status: 'updated'});
  }
  catch(e){
    console.error('Error running update ' + e);
  }
})
```

const express = require('express'); // Vereinfacht die implementierung der Endpunkte.
var bodyParser = require('body-parser'); // Um die Antworten an den Client in JSON umzuwandeln.
const path = require('path'); // Zugriff auf Dateien
const app = express();

app.set('port', (8090)); // definiere den port
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    console.log(res);
    next();
});

app.use(bodyParser.json({type: 'application/json'})); // der body der response wird als json erwartet
app.use(bodyParser.urlencoded({extended: true}));

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(require('./controllers'));

//Starte den Webserver
app.listen(app.get('port'), () => {
  console.log('Api is running');
});

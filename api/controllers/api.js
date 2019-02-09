var express = require('express');
var router = express.Router();
const Joi = require('joi'); // Für die validierung der parameter nach einem Schema.
var Pool = require('pg').Pool; // Der PostgreSQL-Adapter. Man nutzt einen Pool von DB-Connections um nicht jedes mal eine Verbindung auf- und abbauen zu müssen.

// Die Konfiguration der DB
var config = {
  host:'localhost',
  user:'spieler',
  password:'spiel',
  database:'spiele',
  port:5433,
  dialect:"postgres"
};

var pool = new Pool(config);

// Definiere die API route "/spiele" und mappe den GET request auf den SQL-Befehl
// Holle die Liste aller Spiele aus der DB
router.get('/spiele', async (req, res) => {
  try{
    var response = await pool.query("select * from unserespiele");
    console.log(JSON.stringify(response.rows));
    //var spiele_json = JSON.stringify(response.rows);
    // res.render('index', {
    //     title: 'Liste aller Spiele',
    //     spiele: response.rows
    // });
    res.json(response.rows);
  }
  catch(e){
    console.error('Error running query ' + e);
  }
});

// Definiere die API route "/spiele/{id}" und mappe den GET request auf den SQL-Befehl
// Hole das Spiel mit der Id aus der DB
router.get('/spiele/:id', async (req, res) => {
  try{
    var response = await pool.query("select * from unserespiele where id = $1", [req.params.id]);
    console.log('length: ' + response.rowCount);

    if(response.rowCount === 0){
      res.status(404).send('Das Spiel hast Du nicht!');
      //res.json('404: Das Spiel hast Du nicht!');
    }
    else {
      console.log(JSON.stringify(response.rows));
      res.json (response.rows);
    }
  }
  catch(e){
    console.error('Error running query ' + e);
  }
});

// Definiere die API route "/spiele/{id}" und mappe den POST request auf den SQL-Befehl
// Lege ein neues Spiel an. Die Id wird von der DB selbst angelegt
router.post('/spiele', async(req, res) => {
  console.log(req.body);

  const { error } = validateSpiel(req.body);
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }

  var titel = req.body.titel;
  var jahr = req.body.jahr;
  var minspieler = req.body.minspieler;
  var maxspieler = req.body.maxspieler;
  var dauer = req.body.dauer;
  var spieldesjahres = req.body.spieldesjahres;
  var autor = req.body.autor;

  try {
    var autorExists = await pool.query('select name from autor where name = $1', [autor] );
    if(autorExists.rows[0]) {
      console.log('Autor exists: ' + JSON.stringify(autorExists));
    }else{
      var insertAutor = await pool.query('insert into autor (name) values ($1)' , [autor]);
      console.log('Insert Autor' + JSON.stringify(insertAutor));
    }
    var response = await pool.query('insert into unserespiele (titel, jahr, minspieler, maxspieler, dauer, spieldesjahres, autor) values ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [titel, jahr, minspieler, maxspieler, dauer, spieldesjahres, autor]);
    console.log('Save spiel' + JSON.stringify(response));
    res.json(response.rows[0].id);
  }
  catch(e){
    console.error('Error running insert ' + e);
  }
});

// Definiere die API route "/spiele/{id}" und mappe den PUT request auf den SQL-Befehl
// Ändere das Spiel mit der Id in der DB
router.put('/spiele/:id', async(req, res) => {
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
  var minspieler = req.body.minspieler;
  var maxspieler = req.body.maxspieler;
  var dauer = req.body.dauer;
  var spieldesjahres = req.body.spieldesjahres;
  var autor = req.body.autor;

  try {
    var response = await pool.query('UPDATE unserespiele SET titel = $1, jahr = $2, minspieler = $3, maxspieler = $4, dauer = $5, spieldesjahres = $6, autor = $7 WHERE id = $8', [titel, jahr, minspieler, maxspieler, dauer, spieldesjahres, autor, req.params.id]);
    res.json({status: 'updated'});
  }
  catch(e){
    console.error('Error running update ' + e);
  }
});

// Definiere die API route "/spiele/{id}" und mappe den DELETE request auf den SQL-Befehl
// Lösche das Spiel mit der Id aus der DB
router.delete('/spiele/:id', async(req, res) => {
  console.log(req.body);

  var titel = req.body.titel;

  // Look up the spiel
  var response = await pool.query("select * from unserespiele where id = $1", [req.params.id]);

  // If not existing, return 404
  if(response.rowCount === 0){
    res.status(404).send('Das Spiel hast Du nicht!');
    return;
  }

  try {
    var response = await pool.query('delete from unserespiele where id = $1', [req.params.id]);
    res.json({status: 'deleted'});
  }
  catch(e){
    console.error('Error running delete ' + e);
  }

});

// Hilfsfunktion zum Validieren des req.body
function validateSpiel(spiel){
  console.log('validateSpiel start');
  const schema = {
    id : Joi.string(),
    titel : Joi.string().required(),
    jahr : Joi.number().integer().min(1900).max(2100),
    minspieler : Joi.number().integer().min(1),
    maxspieler : Joi.number().integer(),
    dauer : Joi.number().integer(),
    spieldesjahres : Joi.number().integer(),
    autor : Joi.string(),
  };
console.log('validateSpiel end'  );
  return Joi.validate(spiel, schema);
}

module.exports = router;

var express = require('express');
var router = express.Router();

router.use('/api', require('./api'));

router.get('/', async (req, res) => {
  console.log("test api");
  res.json('test');
});


module.exports = router;

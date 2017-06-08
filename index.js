// BASE SETUP
// =============================================================================

// Require dependencies
var path = require('path');
var express    = require('express');      // call express
var app        = express();                 // define our app using express
var cors       = require('cors');

// configure app to use bodyParser()
// this will let us get the data from a POST
var bodyParser = require('body-parser');

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/twitter');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Point static path to dist
//app.use(express.static(path.join(__dirname, 'www')));
//app.use('/src',express.static(path.join(__dirname, 'src')));
//app.use('/node_modules',express.static(path.join(__dirname, 'node_modules'))); //TOFIX

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

require ('./routes/twits') (router);
require ('./routes/users') (router);
app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', router);


// START THE SERVER
// =============================================================================

app.listen(8082);
console.log('Magic happens on port ' + 8082);

/*

DEPEDNDENCIES

*/


require('./config'); //make configuration available
require('./global_functions');

//modules
const express = require('express');
const path = require('path');
// if youre gonna want file uploads
// replace with multer
// or express file uploads
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const methodOverride = require('method-override');
// against request forgery
// might nake testing hard,
// with postman
const cors = require('cors');


/*
  Database connection
*/
let monDb
let URI
if(CONFIG.db.dialect === 'mongo'){
  URI = `mongodb://${CONFIG.db.host}/${CONFIG.db.name}`
  mongoose.connect(URI, {
    useMongoClient: true
  })

  monDb = mongoose.connection
} else {
  console.error("ERROR: This doesnt support other databases apart from mongoDB...yet.");
  return
}

monDb.on('error', ()=>{
  console.error('MongoDb connection Error. Please make sure that', URI, 'is running.');
});

monDb.once('open', ()=>{
  console.info('Connected to MongoDb:', URI);
});


/*
  App

*/

const app = express();


//middleware registration
app.use(bodyParser.json());
// check bodyparser docs for flexibility
app.use(bodyParser.urlencoded({extended: false}));
// for PUT and Delete perhaps
app.use(methodOverride('X-HTTP-Method-Override'));
// should see docs for settings
app.use(cors());

// set port
const port = CONFIG.port;
app.set('port', port);

// static path
if (CONFIG.app !== 'development'){
  app.use('/', express.static(path.join(__dirname, '../dist')));
}


/**
  Routes
**/

// all routes in external file
// might break up that file
// perhaps if we're gonna extemd this app
// to alos be a student portal
require('./api')(app);

// pass routing to angular app
// dont run in prod

if (CONFIG.app !== 'development'){
  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({
    error: err
  });
});
/**
  server
**/

// if we decide to go https
// which we shpould
// if app is off a local network
// change it to https.listen()
// and make .crt and .key
app.listen(port, ()=>{
  console.log(`Server running on localhost:${port}`);
});

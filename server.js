/*

DEPEDNDENCIES

*/


//modules

const express = require('express');
const path = require('path');
// if youre gonna want file uploads
// replace with multex
// or express file uploads
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// against request forgery
// might nake testing hard,
// with postman
const cors = require('cors');


// configuration
const config = require('./server/config');

/*
  Database connection
*/

mongoose.connect(config.MONGO_URI, {useMongoClient: true});
const monDb = mongoose.connection;

monDb.on('error', ()=>{
  console.error('MongoDb connection Error. Please make sure that', config.MONGO_URI, 'is running.');
});

monDb.once('open', ()=>{
  console.info('Connected to MongoDb:', config.MONGO_URI);
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
const port = process.env.PORT || '8083';
app.set('port', port);

// static path
if (process.env.NODE_ENV !== 'dev'){
  app.use('/', express.static(path.join(__dirname, './dist')));
}


/**
  Routes
**/

// all routes in external file
// might break up that file
// perhaps if we're gonna extemd this app
// to alos be a student portal
require('./server/api')(app,config);

// pass routing to angular app
// dont run in prod
if (process.env.NODE_ENV !== 'dev'){
  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
}

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

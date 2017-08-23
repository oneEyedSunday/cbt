#! /usr/bin/env node

const disclaimerText = `This script isnt entirely mine.\n
Its adapted from mozilla.dev.org express tutorial.\n`;
console.log(disclaimerText);
console.log(`This script populates a some tests, questions, options and subjects
   to your database. Specified database as argument - e.g.:
  populatedb mongodb://your_username:your_password@your_dabase_url.
   \r\n Ofcourse you can do mongodb://localhost/db_for_cbt
   \r\n Also do populatedb <mongourl> 'false' to silence creation prompts`);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
const verboseArg = process.argv.slice(3);
let vOpts = ['false', 'FALSE', 'f', 'F'];
var VERBOSE;

if (verboseArg){
  //console.log(verboseArg);
  VERBOSE = vOpts.indexOf(verboseArg)  ? false : true;
  console.log('Chosen verboity level as: ', VERBOSE);

} else {
  VERBOSE = false;
  console.log('Verbosity ignored set to TRUE');

}
if(!userArgs[0].startsWith('mongodb://')){
  console.error("ERROR: You need to specify a valid mongodb URL as the firt argument.This doesnt support other databases...yet.");
  return
}

const async = require('async');
const Subject = require('./models/Subject');
const Test = require('./models/Test');
const Question = require('./models/Question');
const Option = require('./models/Option');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


let subjects = [];
let options = [];
let tests = [];
let questions = [];



function subjectCreate(name,cb){
  subjectdetail = {name: name};
  let subject = new Subject(subjectdetail);

  subject.save((err)=>{
    if (err) {
      cb(err, null);
      return
    }
    if (VERBOSE) console.log('New Subject: ' + subject );
    subjects.push(subject);
    cb(null, subject);
  });
}

function optionCreate(text, cb){
  let option = new Option({text: text});

  option.save((err)=>{
    if (err) {
      cb(err,null);
      return;
    }
    if (VERBOSE) console.log('New Option: ' + option);
    options.push(option);
    cb(null,option);
  });
}


function questionCreate(text,subject, options, answer,cb){
  questiondetail = {
    text: text,
    subject: subject,
    answer: answer
  };

  if(options != false) questiondetail.options = options;

  var question = new Question(questiondetail);
  question.save((err)=>{
    if (err){
      cb(err,null);
      return;
    }
    if(VERBOSE) console.log('New Question: ' + question);
    questions.push(question);
    cb(null,question);
  });
}


function testCreate(title, questions, cb){
  testdetail = {
    title: title
  };

  if (questions != false) testdetail.questions = questions;
  let test = new Test(testdetail);
  test.save((err)=>{
    if (err){
      console.log('ERROR CREATING Test: ' + test);
      cb(err,null);
      return
    }
    if(VERBOSE) console.log('New Test: ' + test);
    tests.push(test);
    cb(null,test);
  });
}

function createOptionSubjects(cb){
  async.parallel([
    function(callback){
      optionCreate("Mathematics contains algebra and fundamental logical implementation.", callback)
    },
    function(callback){
      optionCreate("Chemistry is the study of nature nakedly beneath the skin of physical camoflauge", callback)
    },
    function(callback){
      optionCreate("Physics is just shit.", callback)
    },
    function(callback){
      optionCreate("Computer science is all about programming", callback)
    },
    function(callback){
      optionCreate("Something is fishy here", callback)
    },
    function(callback){
      subjectCreate("Mathematics", callback)
    },
    function(callback){
      subjectCreate("General Knowledge", callback)
    },
    function(callback){
      subjectCreate("English Language", callback)
    },
    function(callback){
      subjectCreate("Book Keeping", callback)
    }
  ], cb);
}

function createQuestions(cb){
  async.parallel([
    function(callback){
      questionCreate("Which of the following statements is most correct: ", subjects[0], [options[0],options[1],options[2], options[3]], "Answer string",callback);
    },
    function(callback){
      questionCreate("Which of the following statements is least correct: ", subjects[1], [options[0],options[1],options[2], options[3]], "Answer string",callback);
    },
    function(callback){
      questionCreate("Some question string: ", subjects[2], [options[0],options[1],options[2], options[3]], "Answer string",callback);
    },
    function(callback){
      questionCreate("Some reverse question string: ", subjects[3], [options[0],options[1],options[2], options[3]], "Answer string",callback);
    },
  ],
  cb)
}

function createTests(cb){
  async.parallel([
    function(callback){
      testCreate("Test 1", [questions[0], questions[1], questions[2], questions[3]], callback)
    }
  ],
    cb)
}


async.series([
  createOptionSubjects,
  createQuestions,
  createTests
],
function(err, results){
  if (err){
     console.log("Final Error: " + err);
   }

   else {
     if (VERBOSE) console.log('Tests craeted ' );
   }

   // All done
   mongoose.connection.close();

});

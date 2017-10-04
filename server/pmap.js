const Test = require('./models/Test');
const Subject = require('./models/Subject');
const Question = require('./models/Question');
const Option = require('./models/Option');
const async = require('async');

const mongoose = require('mongoose');


let options = [];
let questions = [];

// adjust for array indexs
function optionCreate(text, cb){
  let option = new Option({text: text});
  option.save((err) => {
    if (err){
      cb(err, null);
      return;
    }
    options.push(option);
    cb(null,option);
  })
}

function questionCreate(text, subject, options, answer, cb){
  questiondetail = {
    text: text,
    subject: subject,
    answer: answer,
    options: options
  };
  var question = new Question(questiondetail);
  question.save((err) => {
  if (err){
    cb(err, null);
    return;
  }

  questions.push(question);
  cb(null, question);
});
}

function testCreate(title, questions, cb){
  let test = new Test({title: title, questions: questions});
  test.save((err)=> {
    if(err){
      cb(err, null);
      return;
    }
    cb(null,test);
  });
}

function createOptionForQuestion(cb){
  async.parallel([
    function(callback){
      optionCreate(optiondetails, callback)
    }
  ], cb);
}

function createQuestions(cb){
  async.parallel([
    function(callback){
      questionCreate(text, subject, optionsArray, answer, callback)
    }
  ],cb);
}

function createTest(cb){
  async.parallel([
    function(callback){
      testCreate(title, questionsArray, callback);
    }
  ],cb)
}


async.series([
  createOptionForQuestion, createQuestions, createTest
], function(err, results){
  if (err) _handleError(err);
})

function _handleError(err){
  console.log("final error" + err);
}


let juggle = {vsar :"Jugge"};

module.exports =  {juggle};

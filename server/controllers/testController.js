const Test = require('./../models/Test');
const Question = require('./../models/Question');
const Option = require('./../models/Option');
const async = require('async');

let optionsIds = [];
let questionIds = [];
let testTitle;
let questionArray;
let noOfOptions;


// try using promises instead of async module

exports.index = (req,res)=>{
  let test_count = new Promise((res, rej)=>{res(Test.count())});
  let tests = new Promise((res,rej)=>{
    res(Test.find({}, 'title'));
  });

  Promise.all([test_count, tests])
  //.then((vals)=>{res.send({count: vals[0], list: vals[1]})})
  .then(vals => res.send(vals[1]))
  .catch(err=> res.status(500).send({message: err.message}))
}


exports.test_detail = (req,res)=>{
  Test.findById(req.params.id).populate({path: 'questions', select: '_id text options', populate: {path: 'options', select: 'text'}}).exec((err, test)=>{
    if (err) return res.status(500).send({message: err.message});
    if (!test) return res.status(400).send({mesage: 'Test doesnot exist.'});
    res.send(test);
  });
}

exports.mark = (req,res)=>{
  let answerArray = [];
  let choicesArray = req.body;
  Test.findById(req.params.id).populate({path: 'questions', select: 'answer'}).exec((err,test)=> {
    if (err) return res.status(500).send({message: err.message});
    if (!test) return res.status(400).send({message: 'Test doesnt exist that youre trying to mark.'});
    test.questions.map((q) => {answerArray.push(q.answer)});
    let score = mark(choicesArray, answerArray);
    if(score < 0){
      res.status(400).send({message: 'An error occured. Answer array doesnt match expected.'});
    }else {
      res.status(200).send({result: score});
    }
    });
}

exports.create = (req,res)=> {
  init(req);
  // array of questions

  async.series([
    createOptionsForQuestion,createQuestions, createTest
  ], function(err, results){
    if (err) return res.status(500).send({message: err.message});
    return res.status(200).send(results[2][0]);
  })
}

function mark(selected,correct){
  if(selected.length !== correct.length){
    // indicate error
    return -1;
  }

  let score = 0;

  selected.forEach((s, index)=> {
    s === correct[index] ? score++ : '';
  });

  return score;
}

// move these functions out to a seperate file

function optionCreate(text,questionindex, cb){
  let option = new Option({text: text});
  option.save((err) => {
    if (err){
      cb(err, null);
      console.log(err);
      return;
    }
    optionsIds[questionindex].push(option);
    // console.log("Pushed " + option.text);
    cb(null,option);
  })
}


function questionCreate(questiond,questionindex, cb){
  questiondetail = {
    text: questiond.text,
    subject:questiond.subject,
    answer:questiond.answer,
    options: optionsIds[questionindex]
  }
  var question = new Question(questiondetail);
  question.save((err) => {
  if (err){
    cb(err, null);
    return;
  }

  questionIds.push(question);
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


function createOptionsForQuestion(cb){
  let reduced = [];
  let bare = [];
  // reduced is in sync

  questionArray.forEach(function(eachquestion){
    // each question
    eachquestion.options.forEach(function(eachoption){
      // each option
      reduced.push(eachoption);
      bare.push(eachoption.text);
    })
  });
  // might as well, before creating options,
  // add a parameter to dictate which question it be
  // longs to
  // then i can push the option into the correct array
  let wrapped = reduced.map(function(value,index){
    return {index: index, value:value};
  });
console.log("bare array is " + bare);
  async.map(wrapped,function(o,callback){
    optionCreate(o.value.text,QuestionForOption(o.index),callback);
  },cb);
}

function createQuestions(cb){
  let wrapped = questionArray.map(function(value,index){
    return {index:index,value:value};
  });

  let bareopts = [];
  optionsIds.forEach((o)=> {bareopts.push(o.text)});
  console.log(bareopts);

  // optionsIds isnt in sync.
  // fixed this by swnding index
  // to ensure options appear as typed
  // perhaps send in the order they were created.

  async.map(wrapped, function(q,callback){
    questionCreate(q.value,q.index,callback);
  }, cb);
}

function createTest(cb){
  async.parallel([function(callback){
    testCreate(testTitle, questionIds, callback)
  }], cb)
}

function display(){
  console.log("logging optionIds " + optionsIds);
}

init = (req) => {
  questionArray = req.body.questions;
  testTitle = req.body.title;
  noOfQuestions = req.body.questions.length;
  noOfOptions = req.body.questions[0].options.length;
  for(var i = 0; i < noOfQuestions; i++){
    optionsIds[i] = [];
  }
}

function arrayForQ(index){
  let temp = [];
  for(var i =0; i < noOfOptions; i++){
    temp.push(optionsIds[(noOfQuestions*index) + i]);
  }
  return temp;
}

function QuestionForOption(index){
  return Math.floor(index/noOfOptions);
}

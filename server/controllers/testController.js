const Test = require('./../models/Test');
const Question = require('./../models/Question');
const Option = require('./../models/Option');

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

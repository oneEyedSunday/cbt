const Subject = require('./../models/Subject');

// try using promises instead of async module


exports.index = (req,res)=>{
  let subject_count = new Promise((res, rej)=>{res(Subject.count())});
  let subjects = new Promise((res,rej)=>{
    res(Subject.find());
  });

  Promise.all([subject_count, subjects])
  .then((vals)=>{res.send({count: vals[0], list: vals[1]})})
  .catch(err=> res.status(500).send({message: err.message}))
}

const Subject = require('./../models/Subject');

// try using promises instead of async module

// definmitely extract out the find one from creating

exports.index = (req,res)=>{
  let subject_count = new Promise((res, rej)=>{res(Subject.count())});
  let subjects = new Promise((res,rej)=>{
    res(Subject.find());
  });

  Promise.all([subject_count, subjects])
  // .then((vals)=>{res.send({count: vals[0], list: vals[1]})})
  .then((vals)=> {res.send(vals[1])})
  .catch(err=> res.status(500).send({message: err.message}))
};

exports.find = (req,res)=> {
  // Subject.findOne({
  //   _id: req.params.id
  // },
  Subject.findById(req.params.id, 
   (err, subject) => {
    if (err) {
      return res.status(500).send({message: err.message});
    }

    if (!subject) {
      return res.status(400).send({message: 'Subject not found'});
    }

    res.send(subject);
  })
};

exports.create = (req,res) => {
	Subject.findOne({
      name: req.body.name
  }, (err, existingSubject) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingSubject) {
        return res.status(409).send({message: 'This subject already exists'});
      }
      const subject = new Subject({
        name: req.body.name
      });
     subject.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(subject);
      });
    });
};
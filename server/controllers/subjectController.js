const Subject = require('./../models/Subject');
const Test = require('./../models/Test');

// try using promises instead of async module

// definmitely extract out the find one from creating

exports.index = (req,res)=>{

  let subjects = new Promise((res,rej)=>{
    res(Subject.find());
  })
  .then(vals => res.send(vals))
  .catch(err=> res.status(500).send({message: err.message}))
};

exports.find = (req,res)=> {
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

exports.tests = async (req, res) => {
  try {
    const tests = await Test.find({subjectId: req.params.id})
    return res.json(tests)
  } catch (e) {
    return res.status(500).send({
      err: e.message
    })
  }
}

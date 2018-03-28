const Test = require('./../models/Test');
const Question = require('./../models/Question');
const Option = require('./../models/Option');
const Subject = require('./../models/Subject');


const createdOptions = [];
const createdQuestions = [];
// try using promises instead of async module

exports.index = async (req, res) => {
  try {
    const tests = await Test.find({}, 'title')
    return res.json(tests)
  } catch (e) {
    return res.status(500).send({
      error: e.message
    })
  }
}

exports.test_detail = async (req, res) => {
  // TODO: remeber to separate user from admin, remove answer on call from test
  // either imnspect request or/and use jwt
  try {
      const test = await Test.findById(req.params.id)
        .populate({
          path: 'questions', select: '_id text options answer',
          populate: {
            path: 'options', select: 'text'
          }
        }).exec((err, test) => {
          if (err) return res.status(500).send({
            error: err.message
          })

          if (!test) return res.status(400).send({
            message: 'Test does not exist.'
          })

          res.json(test)
        })
  } catch (e) {
    return res.status(500).send({
      error: e.message
    })
  }
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

exports.create =  (req, res) => {
  const AllOptions = [];
  const AllQuestions = [];
  req.body.questions.map(question => {
    AllQuestions.push(question)
    AllOptions.push(question.options)
  })
  // AllQuestions and AllOptions arrays exists here
  createAllOptions(AllOptions)
    .then(options => {
      console.log('createAllOptions returned: ', options);
      createAllQuestions(req.body.subjectId, AllQuestions, options)
        .then(questions => {
          console.log('createAllQuestions returned: ', questions)
          createTest(req.body.title, questions, req.body.subjectId)
            .then(test => {
              console.log(test)
              return res.status(200).json(test)
              // perhaps clean up DB if some creation passed
            }).catch(err => res.status(400).send({error: 'Creating test failed'}))
        }).catch(err => res.status(400).send({error: 'Creating Questions failed'}))
    }).catch(err => res.status(400).send({error: 'Creating Options failed'}))
}

const optionCreate = text => {
  return Option.create({text: text})
    .then(option => {
      // console.log(option._id)
      return option._id
    }).catch(err => { console.error('Error creating option:', err.message) })
  // return 'option ' + text
}

const questionCreate = (questionText, subject, answer, options) => {
  return Question.create({
    text: questionText,
    answer: answer,
    subject: subject,
    options: options
  }).then(question => question._id)
    .catch(err => { console.error('Error while creating question in questionCreate', err.message) })
}


const createOptionsForQuestion = arrayOfOptions => {
   return Promise.all(
    arrayOfOptions.map(
    option => optionCreate(option.text)
  )
  )
    .then(arrayOfResults => {
      // console.log('createOptionsForQuestion result', arrayOfResults)
      return arrayOfResults
    })
    .catch(err => { console.error('Error while creating options for Question', err) })
}


const createAllQuestions = (subject, allQuestions, options) => {
  return new Promise(resolve => {
    resolve(
      Promise.all(
        allQuestions.map(
          (question, index) => questionCreate(question.question, subject, question.answer, options[index])
        )
      ).then(arrayOfQuestions => {
        console.log(arrayOfQuestions)
        return arrayOfQuestions
      })
    )
  })
}

const createAllOptions = allOptions => {
  return new Promise(resolve => {
    resolve(
      Promise.all(
        allOptions.map(optionsForQuestion => createOptionsForQuestion(optionsForQuestion))
      ).then(results => {
        // console.log('results', results)
        return results
      })
    )
  })

}


const createTest = (title, arrayOfQuestions, subject) => {
  return Test.create({
    title: title,
    questions: arrayOfQuestions,
    subjectId: subject
  }).catch(err => console.error('Error creating test', err.message))
}

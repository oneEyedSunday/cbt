const Test = require('./models/Test');
const Subject = require('./models/Subject');
const Question = require('./models/Question');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const mongoDB = 'mongodb://localhost:27017/cbt';
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to ${mongoDB}`)
})

db.on('error', err => {
  console.error(`Error ${err}`)
})

const bootstrap  = async () => {
  const subject = await Subject.findOne()

  const questions = []
  await Question.create({
    answer: 'Existential dilemna is indeed unsolvable, but we as humans as too proud to acknowledge it',
    text: 'Can humans find God via science' ,
    options: []
  }).then(q => {
    questions.push(q)
  })

  await Question.create({
    answer: 'Worst moment',
    text: "I'd rather not recollect" ,
    options: []
  }).then(q => {
    questions.push(q)
  })

  await Test.create({
    title: 'Secomd test for a question' ,
    questions: questions,
    subjectId: subject
  }).then(test => {
    console.log(test)
  })
  .catch(err => {
    console.error(err.message)
  })
}

bootstrap()

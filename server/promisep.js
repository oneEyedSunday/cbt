const Test = require('./models/Test');
const Subject = require('./models/Subject');
const Question = require('./models/Question');
const Option = require('./models/Option');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const mongoDB = 'mongodb://localhost:27017/cbt';
const OPTIONS = {
  useMongoClient: true
}
mongoose.connect(mongoDB, OPTIONS);
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to ${mongoDB}`)
})

db.on('error', err => {
  console.error(`Error ${err}`)
})

const options = [];
const questions = [];
const subjects = [];
const optionsToCreate = [
  "Guggenheim",
  "Heisenburg",
  "Von Hohenheim",
  "Le Trousisser",
  "van Der Reianult"
]

const optionsOne = [
  'PSG',
  'ASM',
  'OM',
  'OL',
  'NIC'
];
const optionsTwo = [
  'MCI',
  'MUN',
  'LIV',
  'SPU',
  'CHE'
];
const optionsThree = [
  'FCB',
  'ATM',
  'RMA',
  'VAL',
  'SEV'
];
const optionsFour = [
  'BMH',
  'BVB',
  'B04',
  'BMG',
  'RBL'
];
const optionsFive = [
  'FCP',
  'SLB',
  'SPO',
  'BRA',
  'GUI'
]
const AllOptions = [
  optionsOne, optionsTwo, optionsThree, optionsFour, optionsFive
];

const AllQuestions = [
  "Ligue 1 top 5",
  "EPL top 5",
  "La Liga top 5",
  "Bundeliga top 5",
  "Portugese League Sagres Top 5"
]
const optionCreate =  async (text) => {
  // return new Promise((resolve, reject) =>
    let option = new Option({text: text});
    // testing save
    // try 1
    // assume save will always go as planned
    // try 2 async and await
    // working uinder auumption that this will always be created
    option.save()
    // they don't get saved sequemtially
    // but ids are returned sequentially
    // good for my purposes
    return option._id
  }

const questionCreate = (questiontext, subject, options) => {
  let question = new Question({
    text: questiontext,
    answer: 'Generic Answer',
    subject: subject,
    options: options
  });

  question.save()
  return question._id
}

const createOptionsForQuestion = (question) => {
  // returning in correct order
  return Promise.all(
    question.map(x => optionCreate(x))
  ).then(arrayOfResults => {
      // console.log("Results from Promise.all createOptionsForQuestion", arrayOfResults)
      return arrayOfResults
    })
}

const createAllQuestions = (subject, options) => {
  // question belongs to Subject
  return new Promise(resolve => {
    Promise.all(
      AllQuestions.map((q, index) => questionCreate(q, subject, options[index]))
    )
    .then(arrayOfQuestions => {
      console.log(`Questions created`)
      resolve(arrayOfQuestions)
    })
  })
}

const createAllOptions = () => {
  return new Promise(resolve => {
    Promise.all(
      AllOptions.map(
        optionsForQuestion => createOptionsForQuestion(optionsForQuestion)
      )
    ).then(results => {
      resolve(results)
    })
  })
}

const createTest = (title, arrayOfQuestions) => {
  Test.create({
    title: title,
    questions: arrayOfQuestions
  }).then(test => test)
}
// strategy
// in series, i.e one after the other
// create options for a question,
// create question
// create Test

// serially


// have to create subject first
let subject = new Subject({name: "Subject_1"});

subject.save()
.then(savedSubject => {
  console.log("Subject created")
  // create options for questions
  createAllOptions()
  .then(options => {
    createAllQuestions(savedSubject, options)
    .then(questions => {
      // create test
      createTest("Test Uno", questions)
    })
  })
})

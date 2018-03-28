const Option = require('./models/Option')

const doer = async number => {
  await new Promise(resolve => {
    resolve('Isako')
  }).then(r => r)
}

const optionCreate = async (text) => {
  console.log('inside')
  try {
    await Option.create({text: text})
    .then(option => {
      console.log('resolved',option)
      return option
    })
  } catch (e) {
    console.error(e);
  }
}


// Promise.all(
//   [
//     optionCreate('zaddy'), optionCreate('$'), optionCreate('Horses in the Stable')
//   ]
// ).then(results => {
//   console.log(results)
// })

optionCreate('Xcaagaha')

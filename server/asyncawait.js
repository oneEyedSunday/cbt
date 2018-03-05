function t (){
  return new Promise(resolve => {
    resolve(23);
  })
}

async function go(){
  await t

}

go()

const at = [1,2,3,4]
at.map((item, index) => {
  console.log(index)
})

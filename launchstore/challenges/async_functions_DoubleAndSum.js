// solving the problem using callback

/*
function doublePlusSumWithCallback(number1, number2, callback) {
  setTimeout( () => {
    result = number1 * 2 + number2
    console.log(result)
    callback(result)
  }, Math.floor(Math.random() * 100) + 1)
}

doublePlusSumWithCallback(5, 0, result => {
  doublePlusSumWithCallback(12, result, result => {
    doublePlusSumWithCallback(2, result, () => {})
  })
})
*/


// solving the problem using promises

/*
function doublePlusSumWithPromise(number1, number2) {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve(number1 * 2 + number2)
    }, Math.floor(Math.random() * 100) + 1)
  })
}

let result = doublePlusSumWithPromise(5, 0).then( result => {
  console.log(result)

  doublePlusSumWithPromise(12, result).then( result => {
    console.log(result)

    doublePlusSumWithPromise(2, result).then( result => {
      console.log(result)
    })
  })
})
*/


// solving the problem using async-await

/*
async function doublePlusSumWithAsyncAwait(number1, number2) {
  return await new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve(number1 * 2 + number2)
    }, Math.floor(Math.random() * 100) + 1)
  })
}

const results = async () => {
  let result = await doublePlusSumWithAsyncAwait(5, 0)
  console.log(result)

  result = await doublePlusSumWithAsyncAwait(12, result)
  console.log(result)

  result = await doublePlusSumWithAsyncAwait(2, result)
  console.log(result)
}

results()
*/
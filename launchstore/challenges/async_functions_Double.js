// solving the problem using callback

/*
function printDoubleWithCallback(number, callback) {
  setTimeout( () => {
    console.log(number * 2)
    callback()
  }, Math.floor(Math.random() * 100) + 1)
}

function printAll() {
  printDoubleWithCallback(1, () => {
    printDoubleWithCallback(2, () => {
      printDoubleWithCallback(3, () => {
        printDoubleWithCallback(4, () => {
          printDoubleWithCallback(5, () => {})
        })
      })
    })
  })
}

printAll()
*/


// solving the problem using promises

/*
let printDoubleWithPromise = number => new Promise( (resolve, reject) => {
  setTimeout( () => {
    resolve(number * 2)
  }, Math.floor(Math.random() * 100) + 1)
})

printDoubleWithPromise(1).then( results => {
  console.log(results)

  printDoubleWithPromise(2).then ( results => {
    console.log(results)

    printDoubleWithPromise(3).then( results => {
      console.log(results)

      printDoubleWithPromise(4).then( results => {
        console.log(results)

        printDoubleWithPromise(5).then( results => {
          console.log(results)
        })
      })
    })
  })
})
*/


// solving the problem using async-await

/*
async function printDoubleWithAsyncAwait(number) {
  return await new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve(number * 2)
    }, Math.floor(Math.random() * 100) + 1)
  })
}

async function printAll() {
  let double

  double = await printDoubleWithAsyncAwait(1)
  console.log(double)

  double = await printDoubleWithAsyncAwait(2)
  console.log(double)

  double = await printDoubleWithAsyncAwait(3)
  console.log(double)

  double = await printDoubleWithAsyncAwait(4)
  console.log(double)

  double = await printDoubleWithAsyncAwait(5)
  console.log(double)
}

printAll()
*/
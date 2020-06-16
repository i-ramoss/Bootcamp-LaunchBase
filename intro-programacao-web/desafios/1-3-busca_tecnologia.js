const users = [
  { name: 'Flora', technologies: ['Node', 'Java'] },
  { name: 'Cecilia', technologies: ['R', 'Python'] },
  { name: 'Clara', technologies: ['Vue', 'Ruby'] },
  { name: 'Pandora', technologies: ['HTML', 'JavaScript'] }
]

function checkIfUseCss(user) {
  
  for (tech of user.technologies) {
    if (tech == 'CSS')
      return true
  }

  return false
}

let noCSS = true

for (user of users) {
  if ( checkIfUseCss(user) ) {
    console.log( `The user ${user.name} works with CSS` )
    noCSS = false
  }
}

if (noCSS)
  console.log('Nobody works with CSS')
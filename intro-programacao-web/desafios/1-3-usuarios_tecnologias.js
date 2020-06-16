const users = [
  { name: 'Flora', technologies: ['Node', ' Vue'] },
  { name: 'Cecilia', technologies: ['R', ' Python'] },
  { name: 'Clara', technologies: ['Python', ' Ruby'] }
]

for (let user of users) {
  console.log(`${user.name} works with ${user.technologies}.`)
} 
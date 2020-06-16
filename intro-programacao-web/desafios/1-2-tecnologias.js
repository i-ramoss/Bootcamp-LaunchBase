const programmer = {
  name: 'Flora',
  age: 19,
  technologies: [
    {name: 'C++', specialty: 'competition'},
    {name: 'R', specialty: 'data analysis'},
    {name: 'Python', specialty: 'pentest'}
  ]
}

console.log ( `The programmer ${programmer.name} is ${programmer.age} years old and uses ${programmer.technologies[0].name} with expertise in ${programmer.technologies[0].specialty}`)
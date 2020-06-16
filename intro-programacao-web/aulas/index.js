function averageCalculator(students) {
  let sum = 0

  for (let i=0; i<students.length; i++) 
    sum += students[i].note

  return sum / students.length
}

function result(average, group) {
  if (average >= 5) 
    console.log(`Congrats, guys. The ${group} average was ${average.toFixed(1)}. You were approved!`)
  else 
    console.log(`The ${group} has an average of lees than 5. You failed.`)
}

function markAsDisapproved(student) {
  student.failed = false

  if (student.note < 5) 
    student.failed = true
}

function sendDisapprovedMessage(student) {
  if (student.failed) 
    console.log( `${student.name}, you failed`)
}

function failedStudents(students) {

  for (student of students) {
    markAsDisapproved(student);
    sendDisapprovedMessage(student)
  }
}

const classA = [
  { name: 'Flora', note: 10 },
  { name: 'Cecília', note: 4.1 },
  { name: 'Maria', note: 5.6 },
  { name: 'Clara', note: 0.3 }
]

const classB = [
  { name: 'Jefferson', note: 5.0 },
  { name: 'Karina', note: 8.2 },
  { name: 'Mateus', note: 0.3 }
]

const averageA = averageCalculator(classA)
const averageB = averageCalculator(classB)

result(averageA, 'class A')
result(averageB, 'class B')

failedStudents(classA)
failedStudents(classB)

console.log(classA)
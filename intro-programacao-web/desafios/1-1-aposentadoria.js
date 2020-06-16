const name = 'Flora'
const sex = 'F'
const age = 54
const contribuition = 30

// tempo de contribuição mínima para homens 35 anos
// tempo de contribuição mínima para mulheres 30 anos

const retirement = age + contribuition

const womanCanRetire = sex === 'F' && contribuition >= 30 && retirement >= 85
const manCanRetire = sex === 'M'&& contribuition >= 35 && retirement >= 95 

if (womanCanRetire || manCanRetire)
  console.log( `${name}, you can retire` )
else  
  console.log( `${name}, you still can't retire` )

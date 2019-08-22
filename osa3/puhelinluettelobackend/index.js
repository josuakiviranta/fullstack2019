//const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('tiny'))

/*
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
} 

app.use(requestLogger)
*/

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get('/api/info', (req, res) => {
  const size = persons.length
  const time = new Date()
  res.send(`
  <div>Phonebook has info for ${size} people</div>
  <div>${time}</div>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => id === person.id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

const generateId = () => {
  const rand = 100
  return Math.floor(Math.random() * Math.floor(rand))
}


app.post('/api/persons', (req, res) => {
  const body = req.body
  const names = persons.map(person => person.name)

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  } else if (names.find(name => name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  } 
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }

    persons = persons.concat(person)
    res.json(person)
  
})


app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.param.id)
  person = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
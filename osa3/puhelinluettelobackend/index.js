const http = require('http')
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(note => {
    res.json(person.toJSON())
  })
})

const generateId = () => {
  const rand = 100000
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
  } else {
    const person = new Person({
      name: body.name,
      number: body.number,
      id: generateId()
    })
    
    persons.concat(person)

    person.save().then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.param.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
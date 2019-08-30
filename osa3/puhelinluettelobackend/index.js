const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')

const Person = require('./models/person')

app.use(bodyParser.json())
const cors = require('cors')

app.use(cors())

const morgan = require('morgan')

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  /*
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
  */
]

app.use(express.static('build'))


app.get('/api/info', (req, res) => {
  Person.find({})
    .then(persons => {
      const size = persons.length
      const time = new Date()
      res.send(`
  <div>Phonebook has info for ${size} people</div>
  <div>${time}</div>`)
    })
})


app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons.map(person => person.toJSON()))
    })
})


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        console.log(person.toJSON())
        res.json(person.toJSON())
      } else {
        res.status(204).end()
      }
    })
    .catch(error => {
      next(error)
    })
})


app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})


const generateId = () => {
  const rand = 100000
  return Math.floor(Math.random() * Math.floor(rand))
}


app.post('/api/persons', (req, res, next) => {
  const body = req.body

  //const names = persons.map(person => person.name)

  /*
    if (!body.name || !body.number) {
      return res.status(400).json({
        error: 'name or number is missing'
      })
    } else if (names.find(name => name === body.name)) {
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
  */

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId()
  })

  persons.concat(person)

  person.save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('SOSs')
    console.log(error.message)
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
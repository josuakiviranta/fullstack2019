const http = require('http')
const express = require('express')
const app = express()

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

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

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
  } else{
    res.status(404).end()
  }
})

const port = 3001
app.listen(port, () => {
console.log(`Server running on port ${port}`)
})
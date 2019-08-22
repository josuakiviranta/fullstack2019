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

app.get('/info', (req, res) => {
  const size = persons.length
  const time = new Date()
  res.send(`
  <div>Phonebook has info for ${size} people</div>
  <div>${time}</div>`)
})

  
  app.get('/persons', (req, res) => {
    res.json(persons)
  })

const port = 3001
app.listen(port, () => {
console.log(`Server running on port ${port}`)
})
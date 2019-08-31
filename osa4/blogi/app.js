const config = require('./utils/config')
const http = require('http') // ---> index.js
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

// const mongoUrl = 'mongodb+srv://fullstack:c4tjmaBSKpXGHYiw@phonebook-28vo8.mongodb.net/blog-list?retryWrites=true'

console.log('connecting to', config.MONGODB_URI)

/*
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
*/

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    connected.log('connectedd to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

/*
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
*/
/*
const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/

module.exports = app
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
      })
  })
  
blogsRouter.post('/', (request, response) => {
  const body = request.body
    
  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes
    })

    console.log('Blog post', blog)

    blog
      .save()
      .then(result => {
        response.status(201).json(result.toJSON())
      })
  })

module.exports = blogsRouter
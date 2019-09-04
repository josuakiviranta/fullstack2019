const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[3])
    await blogObject.save()

})

test('if likes is not defined likes will be defined with value 0', async () => {
    const blogWithoutLikes = {
        title: 'Hipster lifeee',
        author: 'Hip mc swag',
        url: 'pirkko.manttila.fi',
    }

    await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length + 1)

})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a spesific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain('Go To Statement Considered Harmful')
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs identifier is id', async () => {
    const blogs = await api.get('/api/blogs')

    const blogsBody = blogs.body
    for (let blog of blogsBody) {
        expect(blog.id).toBeDefined
    }
})

test('a valid blog can be added ', async () => {
    const newBlog = helper.initialBlogs[0]

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length + 1)

})


afterAll(() => {
    mongoose.connection.close()
})
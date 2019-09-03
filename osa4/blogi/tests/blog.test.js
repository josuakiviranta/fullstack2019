const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as jsno', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs identifier is id', async() => {
    const blogs = await api.get('/api/blogs')

    const blogsBody = blogs.body
    for (let blog of blogsBody) {
        expect(blog.id).toBeDefined
    }
})

afterAll(() => {
    mongoose.connection.close()
})
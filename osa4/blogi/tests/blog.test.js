const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')

describe('when there is initially some notes saved', () => {
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

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('blogs identifier is defined', async () => {
        const blogs = await api.get('/api/blogs')

        const blogsBody = blogs.body
        for (let blog of blogsBody) {
            expect(blog.id).toBeDefined
        }
    })
})

describe('viewing a spesific blog', () => {

    test('a spesific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(titles).toContain('Go To Statement Considered Harmful')
    })


})

describe('addition of a new note', () => {

    test('a valid blog can be added ', async () => {
        const newBlog = helper.initialBlogs[0]

        const blogsAtStart = await helper.blogsInDB()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()

        expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
    })

    test('if likes is not defined likes will be defined with value 0', async () => {
        const blogWithoutLikes = {
            title: 'Hipster lifeee',
            author: 'Hip mc swag',
            url: 'pirkko.manttila.fi',
        }
        const blogsAtStart = await helper.blogsInDB()

        await api
            .post('/api/blogs')
            .send(blogWithoutLikes)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()

        expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)

    })

    test('If title not definded --> 400 bad request', async () => {

        const newBlog = {
            author: 'Hip mc swag',
            url: 'pirkko.manttila.fi',
            likes: 15
        }

        const blogsAtStart = await helper.blogsInDB()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDB()

        expect(blogsAtEnd.length).toBe(blogsAtStart.length)

    })

    test('If url not defined --> 400 bad request', async () => {
        const newBlog = {
            title: 'Hipster lifeee',
            author: 'Hip mc swag',
            likes: 15
        }

        const blogsAtStart = await helper.blogsInDB()

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDB()

        expect(blogsAtEnd.length).toBe(blogsAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
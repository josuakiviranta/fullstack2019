const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f9',
        title: "Testi blogi",
        author: "Josua",
        url: "josu.blogi.fi",
        likes: 42,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d27f9',
        title: "Testi blogi 2",
        author: "Josua",
        url: "josu.blogi.fi",
        likes: 42,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d12f8',
        title: "Testi blogi",
        author: "Josuaki",
        url: "josuaki.blogi.fi",
        likes: 43,
        __v: 0
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDB,
    usersInDB,
}
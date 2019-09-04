const _ = require('lodash')

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

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
    const reducer = (mostLikedBlog, comparingBlog) => {
        if (mostLikedBlog.likes >= comparingBlog.likes) {
            return mostLikedBlog
        } else {
            return comparingBlog
        }
    }
    return blogs.reduce(reducer, {})
}

const mostBlogs = (blogs) => {
    const blogCount = _.countBy(blogs, 'author')

    const arr = Object.keys(blogCount)
        .map(key => ({ author: key, blogs: blogCount[key] }))

    const reducer = (authorForMostBlogs, comparingAuthor) => {
        if (authorForMostBlogs.author === undefined || comparingAuthor.blogs >= authorForMostBlogs.blogs) {
            return comparingAuthor
        } else {
            return authorForMostBlogs
        }
    }
    return arr.reduce(reducer, {})
}

const mostLikes = (blogs) => {
    const arr = blogs
        .map(blog =>
            ({
                author: blog.author,
                likes: blog.likes
            }))

    const groupedWithLikes = arr.reduce((authors, author) => {
        if (Object.keys(authors).includes(author.author)) {
            authors[author.author] += author.likes
        } else {
            authors[author.author] = author.likes
        }
        return authors
    }, {})

    const arrWithLikes = Object.keys(groupedWithLikes)
        .map(key =>
            ({
                author: key,
                likes: groupedWithLikes[key]
            }))

    const reducer = (authorForMostLikes, comparingAuthor) => {
        if (authorForMostLikes.author === undefined || comparingAuthor.likes >= authorForMostLikes.likes) {
            return comparingAuthor
        } else {
            return authorForMostLikes
        }
    }
    return arrWithLikes.reduce(reducer, {})
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    initialBlogs,
}
const _ = require('lodash')

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
}
const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
    const reducer = (mostLikedBlog, comparingBlog) => {
        if (mostLikedBlog.likes >= comparingBlog.likes ) {
            return mostLikedBlog
        } else {
            return comparingBlog
        }
    }
    return blogs.reduce(reducer, {})
}

const mostBlogs = (blogs) => {
    /*
    const testReducer = (authorForMostBlogs, comparingAuthor) => {
        const blogsByAuthor = lodash.groupBy(blogs, comparingAuthor.author)
        console.log('Blogs by author', blogsByAuthor)
        const numberOfBlogs = Object.keys(blogsByAuthor).length
            const author = {
            author: comparingAuthor.author,
            blogs: numberOfBlogs
        }
        console.log('Author', author)
        if (author.blogs >= authorForMostBlogs.blogs) {
            // console.log('Author', author)
            return author
        } else {
            console.log('Author for most blogs', authorForMostBlogs)
            return authorForMostBlogs
        }
    }
    */

    const reducer = (authorForMostBlogs, comparingAuthor) => {
        const blogCount = blogs
        .filter(blog => blog.author === comparingAuthor.author)
        .length

        const author =  {
            author: comparingAuthor.author,
            blogs: blogCount
        }
        
        if (authorForMostBlogs.author === undefined) {
            return author
        } else if (author.blogs >= authorForMostBlogs.blogs) {
            return author
        } else {
            return authorForMostBlogs
        }
    }

    const result = blogs.reduce(reducer, {})
    console.log('RESULT', result)
    console.log('----')
    return blogs.reduce(reducer, {})
    }


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
  }
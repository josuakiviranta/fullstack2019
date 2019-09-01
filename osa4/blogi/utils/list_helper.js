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

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
  }
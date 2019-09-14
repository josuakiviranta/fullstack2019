import React from 'react'

const BlogForm = ({ title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange, addBlog }) => {
    return (
        <div>
            <h1>create new</h1>
            <form onSubmit={addBlog}>
                <div>
                    title: <input
                        type="text"
                        value={title}
                        name="Blogtitle"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author: <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url: <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={handleUrlChange}
                    />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm
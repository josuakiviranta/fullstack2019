import React from 'react'
import { useField } from '../hooks'
import { userInfo } from 'os';

const BlogForm = ({ title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange, addBlog }) => {
    const blogtitle = useField('text')
    const blogauthor = useField('text')
    const blogurl = useField('text')
    const reset = useField('text')
    
    return (
        <div>
            <h1>create new</h1>
            <form onSubmit={addBlog}>
                <div>
                    title: 
                    <input
                        {...blogtitle}
                        {...handleTitleChange(blogtitle.value)}
                    />
                </div>
                <div>
                    author: 
                    <input
                        {...blogauthor}
                        {...handleAuthorChange(blogauthor.value)}
                    />
                </div>
                <div>
                    url:
                     <input
                        {...blogurl}
                        {...handleUrlChange(blogurl.value)}
                    />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
    

    /*
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
    */
}

export default BlogForm
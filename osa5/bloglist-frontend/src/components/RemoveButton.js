import React from 'react'

const RemoveButton = ({blogId, removeBlog}) => {
    return(
    <button id={blogId} onClick={removeBlog}>remove</button>
    )
}

export default RemoveButton
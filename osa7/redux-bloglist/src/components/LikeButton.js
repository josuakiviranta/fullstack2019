import React from 'react'

const LikeButton = ({blogId, addLike}) => {
    return(
    <button id={blogId} onClick={addLike}>like</button>
    )
}

export default LikeButton
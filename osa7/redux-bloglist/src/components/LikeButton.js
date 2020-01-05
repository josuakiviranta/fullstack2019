import React from 'react'
import { connect } from 'react-redux'
import { like } from '../reducers/blogReducer'
import { hideNotification, setNotification } from '../reducers/notificationReducer'

const LikeButton = (props) => {
    return(
    <button
    id={props.id} 
    onClick={() => props.like(props.id)}>like</button>
    )
}

const mapDispatchProps = {
    like,
    hideNotification,
    setNotification
}

export default connect(
    null,
    mapDispatchProps)
    (LikeButton)
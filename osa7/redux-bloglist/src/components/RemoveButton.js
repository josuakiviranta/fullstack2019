import React from 'react'
import { connect } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'

const RemoveButton = (props) => {
    return(
    <button
    id={props.id} 
    onClick={() => props.removeBlog(props.id)}>remove</button>
    )
}

const mapDispatchToProps = {
    removeBlog
}

export default connect(
    null,
    mapDispatchToProps
)(RemoveButton)
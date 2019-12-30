import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    const style = {
        border: 'solid',
        padding: 10, 
        borderWidth: 1
    }

    if (props.notificaton === '') {
        return null
    }
    return (
        <div style={style}>
            {props.notificaton}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notificaton: state.notificaton
    }
}

const ConnectNotification = connect(
    mapStateToProps
)(Notification)

export default ConnectNotification
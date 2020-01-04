import React from 'react'
import { connect } from 'react-redux' 
import { handleLogout } from '../reducers/loginReducer'

const LogoutButton = (props) => {
    return(
    <button id={props.user.id} onClick={props.handleLogout}>logout</button>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.login
    }
}

const mapDispatchToProps = {
    handleLogout
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (LogoutButton)
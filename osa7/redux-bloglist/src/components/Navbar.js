import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router,
Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { Navbar, Nav} from 'react-bootstrap'

const Navigationbar = (props) => {
    const padding = { padding: 5 }
    //console.log("USERNAME: ", props.user.username)
    console.log("SOS")
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">home</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/blogs">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  {props.user
                    ? <em>{props.user.username} logged in</em>
                    : <Link to="/login">login</Link>
                  }
              </Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = state => {
    return {
        user: state.login
    }
}

export default connect(
    mapStateToProps,
    null
)(Navigationbar)
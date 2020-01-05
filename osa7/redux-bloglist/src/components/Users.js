import React from "react"
import  { connect } from "react-redux"
import { getUsers } from "../reducers/userReducer"
import { Table } from 'react-bootstrap'
import { BrowserRouter as Router,
Route, Link, Redirect, withRouter
} from 'react-router-dom'
import User from './User'

const Users =  (props) => {

/*
    const users = props.users.map(user => 
        <div key={user.id}>{user.username} {user.blogs.length}</div>
    )

    
    const blogsCreated = props.users.map(user =>
        <div key={user.id}>{user.blogs.length}</div>
        ) 
*/

    const userById = (id) => {
        console.log("ID: ", id)
        props.users.forEach(u => console.log("USER ID: ", u.id))
        console.log("USER?: ", props.users.find(u => u.id === id))
        return (
        props.users.find(u => u.id === id)
        )
    }

                
    
        
    return(
        <div>
            <Table striped>

                <thead>
                    <tr>
                        <th>Users</th>
                        <th>blogsCreated</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map(user => 
                    <tr key={user.id}>
                        <td key={user.id}>
                            <Link to={`/users/${user.id}`}>{user.username}</Link>
                        </td>
                        <td sytle={{textAlign: 'left'}}>
                            {user.blogs.length}
                        </td>
                    </tr>
                    )}
                </tbody>

            </Table>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = {
    getUsers
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users)
import React from "react"
import  { connect } from "react-redux"
import { getUsers } from "../reducers/userReducer"
import { Table } from 'react-bootstrap'

const Users =  (props) => {


    const users = props.users.map(user => 
        <div key={user.id}>{user.username} {user.blogs.length}</div>
    )

    
    const blogsCreated = props.users.map(user =>
        <div key={user.id}>{user.blogs.length}</div>
        ) 
        
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
                        <td>
                            {user.username}
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
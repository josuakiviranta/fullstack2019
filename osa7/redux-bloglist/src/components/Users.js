import React from "react"
import  { connect } from "react-redux"
import { getUsers } from "../reducers/userReducer"
import { Table } from 'react-bootstrap'
import { BrowserRouter as Router,
Route, Link, Redirect, withRouter
} from 'react-router-dom'

const Users =  (props) => {        
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const User = props => (
    <tr>
        <td class="text-center">{props.index + 1}</td>
        <td class="text-center">{props.user.name}</td>
        <td class="text-center">{props.user.email}</td>
        <td class="text-center">{props.user.role == 1 ? 'admin' : 'member'}</td>
        <td class="text-center" >
            {
                props.user.role == 1
                    ? <p>Admin</p>
                    : <Link className="btn btn-danger"
                        onClick={() => { props.deleteUser(props.user._id) }}>
                        Delete
            </Link>
            }
        </td >
    </tr >
)

export default class BoardDetail extends Component {
    constructor(props) {
        super(props);

        this.deleteUser = this.deleteUser.bind(this)

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/user/accounts')
            .then(response => {
                console.log(response.data)
                this.setState({ users: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteUser(id) {
        console.log(id)
        axios.delete('http://localhost:5000/user/delete?user_id=' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    userList() {
        return this.state.users.map((user, index) => {
            return <User user={user} index={index} deleteUser={this.deleteUser} key={user._id} />;
        })
    }

    render() {
        return (
            <div className="container">

                <h3 style={{ marginTop: "50px" }}>
                    Account List
                </h3>
                <table className="table table-light">
                    <thead className="thead-dark">
                        <tr>
                            <th class="text-center">No.</th>
                            <th class="text-center">Name</th>
                            <th class="text-center">Email</th>
                            <th class="text-center">Role</th>
                            <th class="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
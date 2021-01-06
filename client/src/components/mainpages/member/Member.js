import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlusCircle } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const User = props => (
    <tr>
        <td class="text-center">{props.index + 1}</td>
        <td class="text-center">{props.user.name}</td>
        <td class="text-center">{props.user.email}</td>
        <td class="text-center" >
            {
                props.user._id == cookies.get('user')._id
                    ?
                    props.isOwner
                        ?
                        <p>Team owner</p>
                        :
                        <Link className="btn btn-danger"
                            onClick={() => { props.deleteMember(props.user._id) }}>
                            Leave
                        </Link>
                    :
                    props.isOwner
                        ?
                        <Link className="btn btn-danger"
                            onClick={() => { props.deleteMember(props.user._id) }}>
                            Delete
                        </Link>
                        :
                        <p></p>
            }
        </td >
    </tr >
)

export default class Member extends Component {
    constructor(props) {
        super(props);

        this.deleteMember = this.deleteMember.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        // this.getUser = this.getUser.bind(this)

        this.state = {
            email: '',
            users: [],
            isOwner: false,
            board_id: this.props.match.params.board_id,
            board: '',
            members: [],
            member: '',
            foundMember: {},
            invitedMembers: []
        };
    }

    componentDidMount() {



        axios.get(`http://localhost:5000/api/board/${this.state.board_id}`)
            .then(response => {
                this.setState({
                    board: response.data,
                    members: response.data.members
                })

                this.state.members.map((user) => {
                    if (user.accepted) {
                        axios.get('http://localhost:5000/user/user/' + user.user_id)
                            .then(response => {
                                this.setState({
                                    users: [...this.state.users, response.data]
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                        if (user.isOwner == true && cookies.get('user')._id == this.state.members[0].user_id) {
                            this.setState({
                                isOwner: true
                            })
                        }
                    } else {
                        axios.get('http://localhost:5000/user/user/' + user.user_id)
                            .then(response => {
                                this.setState({
                                    invitedMembers: [...this.state.invitedMembers, response.data]
                                })
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            })


    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
            foundMember: {}
        })
    }

    deleteMember = async id => {
        try {
            const bodyReq = {
                user_id: id
            }
            await axios.put('http://localhost:5000/api/board/remove-member/' + this.state.board_id, bodyReq)
                .then(response => { console.log(response.data) });
            this.setState({
                invitedMembers: this.state.invitedMembers.filter(el => el._id !== id),
                users: this.state.users.filter(el => el._id !== id)
            })
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        const abc = {
            email: this.state.email
        }
        await axios.post('http://localhost:5000/user/user-email', abc)
            .then(response => {
                this.setState({
                    foundMember: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        // console.log((typeof this.state.foundMember === "undefined"))
        if (Object.keys(this.state.foundMember).length > 0) {
            axios.put('http://localhost:5000/api/board/invite-member/' + this.state.board_id, this.state.foundMember)
                .then(res => console.log(res.data));
            if (this.state.invitedMembers
                .filter(e => e != null)
                .filter(e => e.email === this.state.foundMember.email).length == 0
                && this.state.users
                    .filter(e => e != null)
                    .filter(e => e.email === this.state.foundMember.email).length == 0) {
                this.setState({
                    invitedMembers: [...this.state.invitedMembers, this.state.foundMember],
                    email: ''
                })
            }
        }
        this.setState({ email: '' })
    }

    userList() {
        return this.state.users.map((user, index) => {
            if (user) {
                return <User user={user} index={index} isOwner={this.state.isOwner} deleteMember={this.deleteMember} key={user._id} />;
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h3 style={{ marginTop: "50px" }}>
                            Members
                        </h3>
                        <table className="table table-light">
                            <thead className="thead-dark">
                                <tr>
                                    <th class="text-center">No.</th>
                                    <th class="text-center">Name</th>
                                    <th class="text-center">Email</th>
                                    <th class="text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.userList()}

                            </tbody>
                        </table>
                    </div>
                    <div className="col-6">
                        <form onSubmit={this.onSubmit}>
                            <div className="row" style={{ marginTop: "70px", fontWeight: "bold" }}>
                                <div className="col-11">
                                    <label htmlFor="email">Invite Team Members</label>
                                    <input type="email" name="email" id="email" required
                                        class="form-control" placeholder="Enter email address"
                                        value={this.state.email} onChange={this.onChangeEmail} />
                                </div>
                                <div className="col-sm-1">
                                    <button type="submit" style={{ outline: "none" }}>
                                        <FaPlusCircle
                                            style={{ color: "gray", fontSize: "30px", marginTop: "34px", marginLeft: "-20px" }} />
                                    </button>
                                </div>
                            </div>
                        </form>
                        <table className="table table-striped" style={{ marginTop: "30px" }} >
                            {
                                this.state.invitedMembers.filter(member => member != null).map(member => (
                                    <tr>
                                        <td style={{ width: "90%" }} className="align-middle">{member.email}</td>
                                        <td style={{ width: "10%" }}>
                                            <button onClick={() => this.deleteMember(member._id)}
                                                style={{ color: "red", fontSize: "20px", outline: "none", boxShadow: "none" }}>
                                                <FaTimesCircle />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div >
        )
    }
}
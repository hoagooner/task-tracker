import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router";
import { FaPlusCircle } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { FaCalendarAlt } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { FaRegCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { Redirect, useHistory, useParams } from 'react-router-dom'

export default class CreateTask extends Component {


    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeTitleTodo = this.onChangeTitleTodo.bind(this);
        this.onChangeStatusTodo = this.onChangeStatusTodo.bind(this);
        this.cancelUpdateTodo = this.cancelUpdateTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitTodo = this.onSubmitTodo.bind(this);
        this.statuses = ['Not Started', 'In Progress', 'In Review', 'Completed', 'Cancelled'];
        this.priorities = ['Critical', 'High', 'Medium', 'Low'];


        this.state = {
            board_id: this.props.match.params.board_id,
            task_id: this.props.match.params.task_id,
            title: '',
            user_id: '',
            _title: '',
            titleTodo: '',
            description: '',
            startDate: new Date(),
            status: 'Not Started',
            priority: 'Medium',
            endDate: new Date(),
            users: [],
            todos: [],
            isDone: false,
            onEdit: false,
            onEditTodo: false,
            members: [],
            member_ids: [],
            member: '',
            errorEndDate: false
        }
    }

    componentDidMount() {

        console.log(this.props.match.params.task_id)
        if (this.props.match.params.task_id) {
            axios.get('http://localhost:5000/api/task/' + this.props.match.params.task_id)
                .then(response => {
                    this.setState({
                        user_id: response.data.user_id,
                        title: response.data.title,
                        _title: response.data.title,
                        description: response.data.description,
                        startDate: new Date(response.data.startDate),
                        endDate: new Date(response.data.endDate),
                        status: response.data.status,
                        priority: response.data.priority
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })

            axios.get('http://localhost:5000/api/todos?task_id=' + this.props.match.params.task_id)
                .then(response => {
                    this.setState({
                        todos: response.data
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })

            axios.get(`http://localhost:5000/api/board/${this.state.board_id}`)
                .then(response => {
                    this.setState({ member_ids: response.data.members })
                    console.log(response.data.members)
                    // const tempMembers = []
                    this.state.member_ids.map((user) => {
                        axios.get('http://localhost:5000/user/user/' + user.user_id)
                            .then(response => {
                                // tempMembers:[...tempMembers, response.data]
                                this.setState({
                                    members: [...this.state.members, response.data]
                                })
                                console.log(this.state.members)
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    })
                })
                .catch((error) => {
                    console.log(error);
                })


        }

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        this.setState({
            user_id: e.target.value
        })
        console.log(this.state.user_id)
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeStartDate(date) {
        this.setState({
            startDate: date
        })
    }
    onChangeEndDate(date) {
        if (date < this.state.startDate) {
            this.setState({
                errorEndDate: true
            })
        } else {
            this.setState({
                endDate: date,
                errorEndDate: false
            })
        }

    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    }

    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        })
    }

    onChangeTitleTodo(e) {
        this.setState({
            titleTodo: e.target.value
        })
    }

    cancelUpdateTodo(e) {
        this.setState({
            onEditTodo: false
        })
    }

    saveTodo(e) {
        this.setState({
            onEditTodo: false
        })
    }


    editTodo(e) {
        this.setState({
            onEditTodo: true
        })
        // this.componentDidMount()
    }

    deleteTodo = async id => {
        try {
            axios.delete('http://localhost:5000/api/todo/' + id)
                .then(response => { console.log(response.data) });

            this.setState({
                todos: this.state.todos.filter(el => el._id !== id)
            })
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    onChangeStatusTodo = async id => {
        try {
            await axios.put('http://localhost:5000/api/todo/change-status/' + id)
                .then(response => { console.log(response.data) });

        } catch (err) {
            alert(err.response.data.msg)
        }
        this.componentDidMount()

    }




    onSubmit(e) {
        e.preventDefault();

        const task = {
            board_id: this.state.board_id,
            task_id: this.state.task_id,
            user_id: this.state.user_id,
            title: this.state.title,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            status: this.state.status,
            priority: this.state.priority
        }

        console.log(task);

        if (this.state.task_id) {
            axios.put('http://localhost:5000/api/task/' + this.state.task_id, task)
                .then(res => console.log(res.data));
        } else {
            axios.post('http://localhost:5000/api/tasks', task)
                .then(res => console.log(res.data));
        }

        this.setState({
            _title: this.state.title
        })

        window.location = `/board/${this.state.board_id}`;
    }

    async onSubmitTodo(e) {
        e.preventDefault();

        const todo = {
            task_id: this.state.task_id,
            title: this.state.titleTodo,
            isDone: this.state.isDone
        }

        this.setState({
            members: []
        })

        await axios.post('http://localhost:5000/api/todos', todo)
            .then(res => console.log(res.data));

        this.setState({
            titleTodo: ''
        })
        this.componentDidMount()


        // window.location = `/board/${this.state.board_id}`;
    }


    render() {
        const test = this.state.onEditTodo
        return (
            <div>
               
                <Link to={`/board/${this.state.board_id}`}>
                    <FaTimesCircle
                        style={{ float: 'right', marginTop: "-10px", marginRight: "13px", fontSize: "25px", color: "#c2c2a3" }}
                    />
                </Link>
                <div className="container" style={{ border: "1px solid #d6d6c2", marginTop: "30px" }}>
                    {this.state.errorEndDate &&
                        <div className="alert alert-danger">end date must be greater than start date</div>
                    }
                    <input type="hidden" value={this.state.board_id} />
                    <input type="hidden" value={this.props.match.params.task_id} />

                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 style={{ marginTop: "20px" }}>{this.state._title}</h3>
                                <input type="submit" value={this.state.task_id ? "save" : "Create"} style={{ float: "right" }} className="btn btn-primary" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label><b>Assignment to: </b></label>
                                    <select ref="userInput"
                                        className="form-control"
                                        value={this.state.user_id}
                                        onChange={this.onChangeUsername}>
                                        {
                                            this.state.members.map(function (member) {
                                                return <option
                                                    key={member._id}
                                                    value={member._id}>{member.name}
                                                </option>;
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label><b>Title: </b></label>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        value={this.state.title}
                                        onChange={this.onChangeTitle}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <div className="row">
                                    <div className="col-2"><FaCalendarAlt style={{ fontSize: "25px", marginTop: "40px" }} /></div>
                                    <div className="col-10">
                                        <div className="form-group">
                                            <label><b>Start Date: </b></label>
                                            <div style={{ width: "100%", display: "block" }}>
                                                <DatePicker
                                                    selected={this.state.startDate}
                                                    onChange={this.onChangeStartDate}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-3">
                                <div className="row">
                                    <div className="col-2"><FaCalendarAlt style={{ fontSize: "25px", marginTop: "40px" }} /></div>
                                    <div className="col-10">
                                        <div className="form-group">
                                            <label><b>End Date:</b> </label>
                                            <div style={{ width: "100%", display: "block" }}>
                                                <DatePicker
                                                    selected={this.state.endDate}
                                                    onChange={this.onChangeEndDate}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label><b>Status: </b></label>
                                    <select class="form-control"
                                        value={this.state.status}
                                        onChange={this.onChangeStatus}>
                                        {this.statuses.map(function (name) {
                                            return <option value={name}>{name}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="form-group">
                                    <label><b>Priority:</b> </label>
                                    <select class="form-control"
                                        value={this.state.priority}
                                        onChange={this.onChangePriority}>
                                        {this.priorities.map(function (name) {
                                            return <option value={name}>{name}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label><b>Description: </b></label>
                                    < textarea type="text" name="description" id="description"
                                        class="form-control"
                                        value={this.state.description} rows="4" onChange={this.onChangeDescription} />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="col-sm-10">
                        <h5 style={{ marginTop: "20px", marginBottom: "20px" }}>to-do list</h5>
                        <form onSubmit={this.onSubmitTodo}>
                            <div className="row">
                                <div className="col-sm-11">
                                    <div className="form-group">
                                        <input type="text" style={{ border: "1px dotted #80e5ff" }}
                                            required
                                            className="form-control"
                                            value={this.state.titleTodo}
                                            onChange={this.onChangeTitleTodo}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-1">
                                    <button type="submit"><FaPlusCircle style={{ color: "gray", fontSize: "30px", marginTop: "3px" }} /></button>
                                </div>
                            </div>
                        </form>
                        <table className="table table-striped" style={{ marginBottom: "200px" }}>
                            {
                                this.state.todos.map(todo => (
                                    <tr >
                                        <td style={{ width: "5%" }}>
                                            {!todo.isDone &&
                                                <button onClick={() => this.onChangeStatusTodo(todo._id)}
                                                    style={{ color: "gray", fontSize: "20px", outline: "none", boxShadow: "none" }}>
                                                    <FaRegCircle />
                                                </button>
                                            }
                                            {
                                                todo.isDone
                                                &&
                                                <button onClick={() => this.onChangeStatusTodo(todo._id)}
                                                    style={{ color: "#7CB147", fontSize: "20px", outline: "none", boxShadow: "none" }}>
                                                    <FaCheckCircle />
                                                </button>
                                            }
                                        </td>
                                        <>
                                            <td style={{ width: "80%" }} className="align-middle">{todo.title}</td>
                                            <td>
                                                <button onClick={() => this.deleteTodo(todo._id)}
                                                    style={{ color: "#FF5B5B", fontSize: "18px", outline: "none", boxShadow: "none" }}>
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div >
            </div >
        )
    }
}
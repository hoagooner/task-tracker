import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from "react-router";
import { FaTasks } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { FaPlusCircle } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import Cookies from 'universal-cookie';

const cookies = new Cookies();



const statuses = ['Not Started', 'In Progress', 'In Review', 'Completed', 'Cancelled'];
const priorities = ['Critical', 'High', 'Medium', 'Low'];


const Task = props => (
    <div className="row"
        style={{ padding: "18px 0px", border: "1px solid #e0e0d1", margin: "7px 0px" }}>
        <div class="col-sm-1">{props.index + 1}</div>
        <div class="col-sm-3" >{props.task.title}</div>
        <div className="col-sm-7">
            <div className="row">
                <div class="col-sm-3">
                    {props.task.startDate.substring(0, 10)}
                </div>
                <div class="col-sm-3">
                    {props.task.endDate.substring(0, 10)}
                </div>
                <div class="col-sm-3" >
                    <span className={props.task.status.replace(/\s/g, '')}>{props.task.status}</span>
                </div>
                <div class="col-sm-3" >
                   
                    <span className={props.task.priority}>{props.task.priority}</span>
                </div>
            </div>
        </div>
        <div class="col-sm-1">
            <Link style={{ padding: "0px 7px" }}
                to={`/board/${props.task.board_id}/edit-task/${props.task._id}`}>
                <FaPen />
            </Link>
            <Link
                onClick={() => { props.deleteTask(props.task._id) }}>
                <FaTrashAlt style={{ color: " #ff4d4d" }} />
            </Link>
        </div >
    </div >
)

export default class BoardDetail extends Component {
    constructor(props) {
        super(props);

        this.deleteTask = this.deleteTask.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeNewTaskTitle = this.onChangeNewTaskTitle.bind(this)



        this.state = {
            tasks: [],
            board: '',
            newTaskTitle: '',
            board_id: this.props.match.params.id
        };


    }


    componentDidMount() {
        console.log(this.state.board_id)
        axios.get(`http://localhost:5000/api/tasks?board_id=${this.state.board_id}`)
            .then(response => {
                // console.log(response.data)
                this.setState({ tasks: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get(`http://localhost:5000/api/board/${this.state.board_id}`)
            .then(response => {
                // console.log(response.data)
                this.setState({ board: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteTask(id) {
        console.log(id)
        axios.delete('http://localhost:5000/api/task/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            tasks: this.state.tasks.filter(el => el._id !== id)
        })
    }

    taskList() {
        return this.state.tasks.map((task, index) => {
            return <Task task={task} index={index}
                onChangeStatus={this.onChangeStatus}
                deleteTask={this.deleteTask} key={task._id} />;
        })
    }

    onChangeNewTaskTitle(e) {
        this.setState({
            newTaskTitle: e.target.value
        })
    }


    async onSubmit(e) {
        e.preventDefault();

        const task = {
            title: this.state.newTaskTitle,
            board_id: this.state.board_id,
            user_id: cookies.get('user')._id
        }

        console.log(task);

        await axios.post('http://localhost:5000/api/tasks', task)
            .then(res => console.log(res.data));

        this.setState({
            newTaskTitle: ""
        })

        this.componentDidMount();

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10">
                        <h3 style={{ marginTop: "50px" }}>
                            {this.state.board.title}
                        </h3>
                        <h5>Tasks: {this.state.tasks.length}  </h5>
                    </div>
                    <div className="col-2">
                        <Link style={{ float: "right", marginTop: "50px"}}
                            to={`/board/${this.state.board_id}/members`}>
                            <button className="btn btn-secondary">Members</button>
                        </Link>
                    </div>

                </div>

                <div className="row">
                    <div class="col-sm-1"><b>No.</b></div>
                    <div class="col-sm-3"><b>Task</b></div>
                    <div className="col-sm-7">
                        <div className="row">
                            <div class="col-sm-3"><b>Start Date</b></div>
                            <div class="col-sm-3"><b>End Date</b></div>
                            <div class="col-sm-3"><b>Status</b></div>
                            <div class="col-sm-3"><b>Priority</b></div>
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="row" style={{ padding: "20px 0px" }}>
                        <div className="col-sm-11" >
                            <div className="form-group">
                                <input type="text"
                                    style={{ border: "1px dotted #80e5ff", height: "60px" }}
                                    required
                                    placeholder="Add New Task"
                                    className="form-control"
                                    value={this.state.newTaskTitle}
                                    onChange={this.onChangeNewTaskTitle}
                                />
                            </div>
                        </div>
                        <div className="col-sm-1" style={{ marginTop: "7" }}>
                            <button type="submit"
                                style={{ height: "60px" }}
                                className="btn btn-outline-info">Add</button>
                        </div>
                    </div>
                </form>
                {this.taskList()}

            </div>
        )
    }
}
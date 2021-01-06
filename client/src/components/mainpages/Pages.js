import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/not_found/NotFound'
import { GlobalState } from '../../GlobalState'
import Boards from './board/Boards.js'
import CreateBoard from './createBoard/createBoard'
import BoardDetail from './boardDetail/BoardDetail'
import CreateTask from './createTask/createTask'
import Member from './member/Member'
import "bootstrap/dist/css/bootstrap.min.css";
import Users from './users/Users'

function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <Switch>
            <Route path="/" exact component={isLogged ? Boards : Login}  />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/accounts" exact component={isAdmin ? Users : NotFound} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/create_board" exact component={isLogged ? CreateBoard : NotFound} />
            <Route path="/create_board" exact component={isLogged ? CreateBoard : NotFound} />
            <Route path="/board/:id" exact component={isLogged ? BoardDetail : NotFound} />
            <Route path="/board/:board_id/edit-task/:task_id" exact component={isLogged ? CreateTask : NotFound} />
            <Route path="/board/:board_id/members" exact component={isLogged ? Member  : NotFound} />
            <Route path="/edit-board/:id" exact component={isLogged ? CreateBoard : NotFound} />
            <Route path="/board/:board_id/create-task" exact component={isLogged ? CreateTask : NotFound} />
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages

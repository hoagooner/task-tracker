import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Cookies from 'universal-cookie';

const cookies = new Cookies();


function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [menu, setMenu] = useState(false)
    const user = state.userAPI.user

    const logoutUser = async () => {
        await axios.get('/user/logout')

        localStorage.removeItem('firstLogin')
        cookies.remove('user', { path: '/' });

        window.location.href = "/";
    }

    const createBoard = () => {
        return (
            <>
                <li><Link to="/create_board" style={{ textDecoration: 'none',color:'black' }}>Create Board</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return (
            <>
                <li><Link to="/" onClick={logoutUser} style={{ textDecoration: 'none',color:'black' }}>Logout</Link></li>
            </>
        )
    }

    const viewUsers = () =>{
        return(
            <>
                <li><Link to="/accounts" style={{ textDecoration: 'none',color:'black'}}><p>Manage accounts</p></Link></li>
            </>
        )
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo" style={{float:"left"}}>
                <h1>
                    <Link to="/" style={{ textDecoration: 'none' }}>Task Tracker</Link>
                </h1>
            </div>

            <ul style={{float:"right",marginTop:"20px"}}>

                <li><p>{isLogged ? 'Hi '+ cookies.get('user') ? cookies.get('user').name : '' : ''}{isAdmin ? ' (admin)' : ''}</p></li>

                <li>{isLogged && createBoard()}</li>

                <li>{isAdmin && viewUsers()}</li>

                {
                    isLogged ? loggedRouter() : <li><Link to="/login" style={{ textDecoration: 'none' }}>Login</Link></li>
                }

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>

            </ul>
        </header>
    )
}

export default Header

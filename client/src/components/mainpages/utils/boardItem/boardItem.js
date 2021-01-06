import React from 'react'
import BtnRender from './BtnRender'
import { FaEdit } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom'

function BoardItem({ board, deleteBoard }) {

    return (
        <div className="board_card" 
        style={{ display: "inline-block",borderRadius:"10px", border:"2px solid gray" }}>
            <IconContext.Provider value={{ size: "25px" }}>
                <div style={{ float: "right" }}>
                    <Link to={`/edit-board/${board._id}`}>
                    <FaEdit />
                    </Link>
                </div>
            </IconContext.Provider>
            <img src={board.images.url
                ? board.images.url
                : "https://cdn1.iconfinder.com/data/icons/online-education-indigo-vol-2/256/Home_Education-512.png"}
                alt="image" style={{clear:"right"}}/>
            <div className="board_box">
                <h3 title={board.title}>{board.title}</h3>
            </div>
            <BtnRender board={board} deleteBoard={deleteBoard} />
        </div>
    )
}

export default BoardItem

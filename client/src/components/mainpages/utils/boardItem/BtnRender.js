import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function BtnRender({ board, deleteBoard }) {
    const state = useContext(GlobalState)
    // const user = typeof cookies.get('user') === "undefined" ? '' : cookies.get('user')

    return (
        <div className="row_btn">
            {
                <>
                    <Link  to="#!" className="btn btn-danger"
                        onClick={() => deleteBoard(board._id, board.images.public_id)}>
                        Delete
                   </Link>
                    <Link className="btn btn-primary"  to={`/board/${board._id}`}>
                        View
                   </Link>
                </>
            }

        </div >
    )
}

export default BtnRender

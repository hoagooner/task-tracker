import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import BoardItem from '../utils/boardItem/boardItem'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Boards() {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [boards, setBoards] = state.boardsAPI.boards
    const [inviteBoards, setInviteBoards] = state.boardsAPI.inviteBoards

    const [callback, setCallback] = state.boardsAPI.callback

    const deleteBoard = async (id, public_id) => {
        try {
            if (public_id) {
                const destroyImg = axios.post('/api/destroy', { public_id }, {
                    headers: { Authorization: token }
                })

                await destroyImg
            }

            const deleteBoard = axios.delete(`/api/boards/${id}`, {
                headers: { Authorization: token }
            })

            await deleteBoard
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const onAccept = async (id) => {
        const bodyReq = {
            user_id: cookies.get('user')._id
        }
        try {
            const acceptBoard = axios.put(`/api/board/accept/${id}`, bodyReq,{
                headers: { Authorization: token }
            })
            await acceptBoard
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const onReject = async (id) => {
        const bodyReq = {
            user_id: cookies.get('user')._id
        }
        try {
            const acceptBoard = axios.put(`/api/board/remove-member/${id}`, bodyReq,{
                headers: { Authorization: token }
            })
            await acceptBoard
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <div className="boards">
            <h4>Your boards ({boards.length})</h4>
            {
                boards.map(board => {
                    return <BoardItem key={board._id} board={board}
                        deleteBoard={deleteBoard} />
                })
            }
            <h4>Invitations ({inviteBoards.length})</h4>
            <table className="table table-striped col-6" >
                {
                    inviteBoards.map(inviteBoard => (
                        <tr>
                            <td style={{ width: "80%" }} className="align-middle">{inviteBoard.title}</td>
                            <td style={{ width: "10%" }}>
                                <button className="btn btn-outline-danger" onClick={() => onReject(inviteBoard._id)}>
                                    Reject
                                </button>
                            </td>
                            <td style={{ width: "10%" }}>
                                <button className="btn btn-outline-success" onClick={() => onAccept(inviteBoard._id)}>
                                    Accept
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )

}

export default Boards

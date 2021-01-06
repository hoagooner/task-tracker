import {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function BoardAPI() {
    const [boards, setBoards] = useState([])
    const [inviteBoards, setInviteBoards] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getBoards = async () => {
            const res = await axios.get(`/api/boards?user_id=${typeof cookies.get('user') === "undefined" ? '' : cookies.get('user')._id}`)
            // console.log(res.data.boards)
            setBoards(res.data.boards)
            // setResult(res.data.result)
        }
        getBoards()

        const getInviteBoards = async () => {
            const res = await axios.get(`/api/inviteBoards?user_id=${typeof cookies.get('user') === "undefined" ? '' : cookies.get('user')._id}`)
            // console.log(res.data.boards)
            setInviteBoards(res.data.boards)
            // setResult(res.data.result)
        }
        getInviteBoards()
    },[callback])
    
    return {
        boards: [boards, setBoards],
        inviteBoards: [inviteBoards, setInviteBoards],
        callback: [callback, setCallback],
    }
}

export default BoardAPI

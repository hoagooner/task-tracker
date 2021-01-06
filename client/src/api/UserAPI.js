import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [history, setHistory] = useState([])
    const [user, setUser] = useState()


    useEffect(() => {
        if (token) {
            // const getUser = async () => {
            //     try {
            //         const res = await axios.get('/user/infor', {
            //             headers: { Authorization: token }
            //         })

            //         // if(!res){
            //         //  window.location = '/login';
            //         // }

            //         setIsLogged(true)
            //     } catch (err) {
            //         alert(err.response.data.msg)
            //         // return window.location = '/login';
            //     }
            // }
            // getUser()
            if(cookies.get('user')){
                setIsLogged(true)
                if(cookies.get('user').role==1){
                    console.log("admin")
                    setIsAdmin(true);
                }
            }
        }
    }, [token])


    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        history: [history, setHistory],
        user: [user, setUser]
    }
}

export default UserAPI

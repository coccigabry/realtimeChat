import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/context'


export default function Conversations({ conv }) {
    const { user: currentUser } = useContext(AuthContext)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const friendId = conv.members.find(m => m !== currentUser.other._id)
        const fetchUser = async() => {
            const res = await axios.get(`/api/users/${friendId}`)
            setUser(res.data.infos)
        }
        fetchUser()
    }, [currentUser, conv])


    return (
        <div className='conversations'>
            <img className='conversationImg' src={user?.profilePicture || '/src/assets/no-user.png'} alt='user profile picture' />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}

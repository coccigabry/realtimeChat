import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'


export default function Chat({ msg, own }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/api/users/${msg.sender}`)
            setUser(res.data.infos)
        }
        fetchUser()
    }, [])


    return (
        <div className={own ? 'chat own' : 'chat'}>
            <div className="chatTop">
                <img className='chatImg' src={user?.profilePicture || '/src/assets/no-user.png'} alt='' />
                <p className='chatText'>{msg.text}</p>
            </div>
            <div className="chatBottom">{format(msg.createdAt)}</div>
        </div>
    )
}

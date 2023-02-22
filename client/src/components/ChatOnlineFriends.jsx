import axios from 'axios'
import React, { useEffect, useState } from 'react'


export default function ChatOnlineFriends({ onlineUsers, currentUser }) {
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`/api/users/friends/${currentUser}`)
            setFriends(res.data.infos)
        }
        getFriends()
    }, [currentUser])

    useEffect(() => {
        setOnlineFriends(
            friends.filter(friend => onlineUsers.includes(friend._id))
        )
    }, [friends, onlineUsers])

    const renderOnlineFriends = onlineFriends.map(online => (
        <div key={online._id} className="onlineFriend" >
            <div className="onlineFriendImgContainer">
                <img className="onlineFriendImg" src={online.profilePicture || '/src/assets/no-user.png'} alt='' />
                <div className="onlineFriendBadge"></div>
            </div>
            <span className="onlineFriendName">{online.username}</span>
        </div>
    ))


    return (
        <div className='ChatOnlineFriends'>
            {renderOnlineFriends}
        </div>
    )
}

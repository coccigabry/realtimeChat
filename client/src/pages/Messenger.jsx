import Conversations from '../components/Conversations'
import Chat from '../components/Chat'
import ChatOnlineFriends from '../components/ChatOnlineFriends'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/context'
import axios from 'axios'
import io from 'socket.io-client'


export default function Messenger() {
    const { user: currentUser } = useContext(AuthContext)
    const scrollRef = useRef()
    const socket = useRef()
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        socket.current = io('ws://localhost:8900')
        socket.current.on('getMessage', data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages(prev => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit('addUser', currentUser.other._id)
        socket.current.on('getUsers', users => {
            setOnlineUsers(
                currentUser.other.following.filter(
                    f => users.some(
                        u => u.userId === f
                    )
                )
            )
        })
    }, [currentUser.other._id])

    useEffect(() => {
        const fetchConv = async () => {
            try {
                const res = await axios.get(`/api/conversations/${currentUser.other._id}`)
                setConversations(res.data.infos)
            } catch (err) {
                console.error(err)
            }
        }
        fetchConv()
    }, [currentUser.other._id])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/api/messages/${currentChat._id}`)
                setMessages(res.data.infos)
            } catch (err) {
                console.error(err)
            }
        }
        fetchMessages()
    }, [currentChat])

    const renderConvs = conversations.map(conv => {
        return (
            <div key={conv._id} onClick={() => setCurrentChat(conv)}>
                <Conversations conv={conv} currentUser={currentUser.other._id} />
            </div>
        )
    })

    const renderMsgs = messages.map(msg => {
        return (
            <div key={msg._id} ref={scrollRef}>
                <Chat msg={msg} own={msg.sender === currentUser.other._id} />
            </div>
        )
    })

    const handleSend = async (e) => {
        e.preventDefault()
        const newMsg = {
            conversationId: currentChat._id,
            sender: currentUser.other._id,
            text: newMessage
        }

        const receiverId = currentChat.members.find(user => user !== currentUser.other._id)

        socket.current.emit('sendMessage', {
            senderId: currentUser.other._id,
            receiverId,
            text: newMessage
        })

        try {
            const res = await axios.post(`/api/messages`, { newMsg })
            setMessages([...messages, res.data.infos])
            setNewMessage('')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])


    return (
        <>
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input className='chatMenuInput' type="text" placeholder='Search on your chats' />
                        {renderConvs}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat
                                ? (
                                    <>
                                        <div className="chatBoxTop">
                                            {renderMsgs}
                                        </div>
                                        <div className="chatBoxBottom">
                                            <textarea
                                                className='chatBoxInput'
                                                placeholder='type your message here'
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                value={newMessage}
                                            ></textarea>
                                            <button className='chatBoxButton' onClick={handleSend}>Send</button>
                                        </div>
                                    </>
                                )
                                : <span className='chatBoxNoConversation'>Open a conversation to start a chat</span>
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnlineFriends
                            onlineUsers={onlineUsers}
                            currentUser={currentUser.other._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const io = require('socket.io')(8900, {
    cors: { origin: "*" }
})

let users = []

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId })
}

const getUser = userId => users.find(user => user.userId == userId)

const removeUser = socketId => users = users.filter(user => user.socketId !== socketId)


io.on('connection', (socket) => {
    //WHEN CONNECTING
    console.log('user connected')
    //take userId and socketId from user
    socket.on('addUser', userId => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    //WHEN SENDING-RECEIVING MESSAGES
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId)
        io.to(user.socketId).emit('getMessage', { senderId, text })
    })

    //WHEN DISCONNECTING
    socket.on('disconnect', () => {
        console.log('user disconnected')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
})
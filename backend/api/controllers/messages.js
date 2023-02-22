import Message from '../models/Message.js'


export const newMsgCtrl = async(req, res) => {
    const newMsg = new Message(req.body.newMsg)

    try {
        const savedMsg = await newMsg.save()
        res.status(201).json({ message: 'Message sent successfully', infos: savedMsg })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}


export const getMsgsCtrl = async(req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.id
        })
        res.status(201).json({ message: 'Messages found successfully', infos: messages })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}
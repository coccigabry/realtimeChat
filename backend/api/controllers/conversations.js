import Conversation from '../models/Conversation.js'


export const newConvCtrl = async (req, res) => {
    const newConv = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConv = await newConv.save()
        res.status(201).json({ message: 'Conversation saved successfully', infos: savedConv })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

export const getConvCtrl = async (req, res) => {
    try {
        const conv = await Conversation.find({
            members: { $in: [req.params.id] }
        })
        res.status(201).json({ message: 'Conversation found successfully', infos: conv })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}
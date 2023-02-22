import User from '../models/User.js'
import bcrypt from 'bcrypt'


export const updateCtrl = async (req, res) => {
    if (req.body.password) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        } catch (err) {
            res.status(500).json({ message: 'There was an error', infos: err })
        }
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        const { password, ...other } = user._doc
        res.status(201).json({ message: 'User updated successfully', infos: other })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

export const deleteCtrl = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(201).send('User deleted successfully')
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

export const getCtrl = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, updatedAt, ...other } = user._doc
        res.status(201).json({ message: 'User found successfully', infos: other })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

export const getFriendsCtrl = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const userFriends = await Promise.all(
            user.following.map(friendId => {
                return User.findById(friendId)
            })
        )
        let friendsList = []
        userFriends.map(friend => {
            const { _id, username, profilePicture } = friend
            friendsList.push({ _id, username, profilePicture })
        })
        res.status(201).json({ message: 'Friend List found successfully', infos: friendsList })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

export const followCtrl = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const userToFollow = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!userToFollow.followers.includes(req.params.id)) {
                await userToFollow.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { following: req.params.id } })
                res.status(201).json({ message: 'You have started to follow this user!' })
            } else {
                res.status(403).json({ message: 'You already follow this user' })
            }
        } catch (err) {
            res.status(500).json({ message: 'There was an error', infos: err })
        }
    } else {
        res.status(403).json({ message: 'You cannot follow yourself' })
    }
}

export const unfollowCtrl = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const userToUnfollow = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (userToUnfollow.followers.includes(req.body.userId)) {
                await userToUnfollow.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { following: req.params.id } })
                res.status(201).json({ message: 'You are not following this user anymore!' })
            } else {
                res.status(403).json({ message: 'You not follow this user already' })
            }
        } catch (err) {
            res.status(500).json({ message: 'There was an error', infos: err })
        }
    } else {
        res.status(403).json({ message: 'Error, You are trying to unfollow yourself' })
    }
}
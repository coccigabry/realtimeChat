import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const registerCtrl = async (req, res) => {
    try {
        const hashedPsw = await bcrypt.hash(req.body.password, 10)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPsw
        })

        await newUser.save()

        const { password, ...other } = newUser._doc

        res.status(201).json({ message: 'User created successfully', infos: other })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

export const loginCtrl = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(401).send('This username does not exist')

        const isPswCorrect = await bcrypt.compare(req.body.password, user.password)
        !isPswCorrect && res.status(401).send('Wrong credentials')

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.IsAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        const { password, ...other } = user._doc

        res.status(201).json({ message: 'User logged successfully', infos: { other, accessToken } })
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}
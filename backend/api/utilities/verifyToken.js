import jwt from 'jsonwebtoken'


// CHECK IF USER IS LOGGED IN
export const verifyToken = (req, res, next) => {
    try {
        const headerToken = req.headers.token
        if (!headerToken) return res.status(401).send('You are not authenticated')
        const accessToken = headerToken.split(' ')[1]
        jwt.verify(
            accessToken,
            process.env.JWT_SECRET,
            (err, user) => {
                if (err) return res.status(403).send('Invalid token')
                req.user = user
                next()
            }
        )
    } catch (err) {
        res.status(500).json({ message: 'There was an error', infos: err })
    }
}

// CHECK USER PERMISSIONS
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(403).send('You are not allowed to perform this action')
        }
    })
}

// CHECK IF ADMIN
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).send('Only admins can perform this action')
        }
    })
}
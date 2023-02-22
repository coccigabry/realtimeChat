import express from 'express'
import { verifyToken, verifyUser } from '../utilities/verifyToken.js'
import { updateCtrl, deleteCtrl, getCtrl, getFriendsCtrl, followCtrl, unfollowCtrl } from '../controllers/users.js'


const router = express.Router()

// UPDATE USER
router.put('/:id', /* verifyUser, */ updateCtrl)
// DELETE USER
router.delete('/:id', /* verifyUser, */ deleteCtrl)
// GET USER
router.get('/:id', /* verifyUser, */ getCtrl)
// GET FRIENDS
router.get('/friends/:id', /* verifyUser, */ getFriendsCtrl)
// FOLLOW USER
router.put('/:id/follow', /* verifyToken, */ followCtrl)
// UNFOLLOW USER
router.put('/:id/unfollow', /* verifyToken, */ unfollowCtrl)


export default router
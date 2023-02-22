import express from 'express'
import { verifyToken } from '../utilities/verifyToken.js'
import { getMsgsCtrl, newMsgCtrl } from '../controllers/messages.js'


const router = express.Router()

// ADD MESSAGE TO CONVERSATION
router.post('/', /* verifyToken, */ newMsgCtrl)
// GET ALL MESSAGES FROM CONVERSATION
router.get('/:id', /* verifyToken, */ getMsgsCtrl)


export default router
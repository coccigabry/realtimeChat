import express from 'express'
import { verifyToken } from '../utilities/verifyToken.js'
import { getConvCtrl, newConvCtrl } from '../controllers/conversations.js'


const router = express.Router()

// NEW CONVERSATION
router.post('/', /* verifyToken, */ newConvCtrl)
// GET CONVERSATION WITH A USER
router.get('/:id', /* verifyToken, */ getConvCtrl)

export default router
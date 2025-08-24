import express from 'express'
import { deleteUser, updateUser ,getUserListings} from '../controllers/userController.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.delete('/listings/:id', verifyToken, getUserListings)

export default router;

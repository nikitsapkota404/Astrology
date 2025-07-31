import { updateUser, getAllUsers, getOneUser, deleteUser, getUserProfile, getMyAppointments } from "../Controllers/userController.js";
import express from 'express'
import { authenticate, restrict } from "../auth/verifyToken.js";
    
const router = express.Router();

router.get('/profile/me', authenticate, restrict(["client"]), getUserProfile)
router.get('/appointments/my-appointments', authenticate, restrict(["client"]), getMyAppointments)

router.get('/:id', authenticate, restrict(["client"]), getOneUser)
router.get('/', authenticate, restrict(["admin"]), getAllUsers)
router.put('/:id', authenticate, restrict(["client"]), updateUser)
router.delete('/:id', authenticate, restrict(["client"]), deleteUser)

export default router;
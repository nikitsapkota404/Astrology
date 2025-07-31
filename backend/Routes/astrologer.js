import { updateAstrologer, getAllAstrologers, getOneAstrologer, deleteAstrologer, getAstrologerProfile } from "../Controllers/astrologerController.js";
import express from 'express'
import reviewRoute from './review.js'
import { authenticate, restrict } from "../auth/verifyToken.js";
    
const router = express.Router();
router.use('/:astrologerId/reviews', reviewRoute)
router.get('/profile/me', authenticate, restrict(['astrologer']), getAstrologerProfile)
router.get('/:id', getOneAstrologer)
router.get('/', getAllAstrologers)
router.put('/:id', authenticate, restrict(["astrologer"]), updateAstrologer)
router.delete('/:id', authenticate, restrict(["astrologer"]), deleteAstrologer)


export default router;
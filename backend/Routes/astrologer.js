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
router.delete('/profile/me', authenticate, restrict(['astrologer']), async (req, res) => {
  try {
    await Astrologer.findByIdAndDelete(req.userId);
    res.status(200).json({ success: true, message: 'Astrologer deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete astrologer account' });
  }
});

router.delete('/:id', authenticate, restrict(["astrologer"]), deleteAstrologer)


export default router;
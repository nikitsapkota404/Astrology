import { updateAstrologer, getAllAstrologers, getOneAstrologer, deleteAstrologer, getAstrologerProfile } from "../Controllers/astrologerController.js";
import express from 'express'
import Astrologer from '../models/AstrologerSchema.js';
import reviewRoute from './review.js'
import { authenticate, restrict } from "../auth/verifyToken.js";
    
const router = express.Router();
router.use('/:astrologerId/reviews', reviewRoute)
router.get('/profile/me', authenticate, restrict(['astrologer']), getAstrologerProfile)
router.get('/:id', getOneAstrologer)
router.get('/', getAllAstrologers)
router.put('/:id', authenticate, restrict(["astrologer"]), updateAstrologer)
router.delete('/profile/me', authenticate, restrict(['astrologer']), async (req, res) => {
  console.log("Deleting astrologer with userId:", req.userId);
  try {
    const deleted = await Astrologer.findByIdAndDelete(req.userId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Astrologer not found' });
    }
    res.status(200).json({ success: true, message: 'Astrologer deleted successfully' });
  } catch (err) {
    console.error("Error deleting astrologer:", err);
    res.status(500).json({ success: false, message: 'Failed to delete astrologer account' });
  }
});


router.delete('/:id', authenticate, restrict(["astrologer"]), deleteAstrologer)


export default router;
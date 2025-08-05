import express from 'express';
import Review from '../models/ReviewSchema.js'; 
import { getAllReviews, createReview } from '../Controllers/reviewController.js';
import { authenticate, restrict } from './../auth/verifyToken.js';

const router = express.Router({ mergeParams: true });

// Use controller for GET and POST
router.route('/')
  .get(getAllReviews)
  .post(authenticate, restrict(['client']), createReview);

// DELETE route for review
router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ success: false, message: 'Failed to delete review' });
  }
});

router.delete('/test/:id', (req, res) => {
  console.log('Test delete route hit, id:', req.params.id);
  res.json({ success: true, message: 'Test route hit' });
});
export default router;

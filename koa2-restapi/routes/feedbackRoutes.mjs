import Router from '@koa/router';
import {
  getFeedbacks,
  addFeedback,
  updateFeedback,
  deleteFeedback,
  getFeedback,
} from '../controllers/feedbackController.mjs';

const router = new Router();

router.get('/feedback/list', getFeedbacks);
router.post('/feedback', addFeedback);
router.put('/feedback/:id', updateFeedback);
router.delete('/feedback/:id', deleteFeedback);
router.get('/feedback/detail/:id', getFeedback);

export default router;

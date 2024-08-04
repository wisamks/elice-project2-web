import { Router } from 'express';

import CommentsController from '@_/controllers/commentsController';
import { authenticateAccessToken } from '@_middlewares';

const router = Router();

router.get('/', CommentsController.getCommentsByPostId);
router.post('/', authenticateAccessToken, CommentsController.createComment);
router.put('/:commentId', authenticateAccessToken, CommentsController.updateComment);
router.delete('/:commentId', authenticateAccessToken, CommentsController.deleteComment);

export default router;
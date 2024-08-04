import CommentsController from '@_/controllers/commentsController';
import { Router } from 'express';

const router = Router();

router.get('/', CommentsController.getCommentsByPostId);
router.post('/', CommentsController.createComment);
router.put('/:commentId', CommentsController.updateComment);
router.delete('/:commentId', CommentsController.deleteComment);

export default router;
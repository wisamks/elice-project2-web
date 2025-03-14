import { Router } from 'express';

import CommentsController from '@_/controllers/commentsController';
import { authenticateAccessToken, validator } from '@_middlewares';
import CommentGetDTO from '@_/middlewares/DTOs/commentGetDTO';
import CommentPostDTO from '@_/middlewares/DTOs/commentPostDTO';
import CommentPutDTO from '@_/middlewares/DTOs/commentPutDTO';
import CommentDeleteDTO from '@_/middlewares/DTOs/commentDeleteDTO';

const router = Router();

router.get('/', validator(CommentGetDTO), CommentsController.getCommentsByPostId);
router.post('/', authenticateAccessToken, validator(CommentPostDTO), CommentsController.createComment);
router.put('/:commentId', authenticateAccessToken, validator(CommentPutDTO), CommentsController.updateComment);
router.delete('/:commentId', authenticateAccessToken, validator(CommentDeleteDTO), CommentsController.deleteComment);

export default router;
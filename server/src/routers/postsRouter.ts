import PostsController from '@_/controllers/postsController';
import { authenticateAccessToken } from '@_/middlewares';
import { Router } from 'express';

const router = Router();

router.get('/', PostsController.getAllPosts);

router.get('/:postId', PostsController.getPost);

router.post('/', authenticateAccessToken, PostsController.createPost);

router.put('/:postId', authenticateAccessToken, PostsController.updatePost);

router.delete('/:postId', authenticateAccessToken, PostsController.deletePost);

export default router;
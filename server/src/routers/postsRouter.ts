import PostsController from '@_/controllers/postsController';
import { authenticateAccessToken } from '@_/middlewares';
import { Router } from 'express';

const router = Router();
// 게시판 목록 조회
router.get('/', PostsController.getAllPosts);
// 게시글 상세 조회
router.get('/:postId', PostsController.getPost);
// 게시글 작성
router.post('/', authenticateAccessToken, PostsController.createPost);
// 게시글 수정
router.put('/:postId', authenticateAccessToken, PostsController.updatePost);
// 게시글 삭제
router.delete('/:postId', authenticateAccessToken, PostsController.deletePost);

export default router;
import PostsController from '@_/controllers/postsController';
import { authenticateAccessToken, validator } from '@_/middlewares';
import PostCreateDTO from '@_/middlewares/DTOs/postCreateDTO';
import PostGetDTO from '@_/middlewares/DTOs/postGetDTO';
import PostGetOneDTO from '@_/middlewares/DTOs/postGetOneDTO';
import PostUpdateDTO from '@_/middlewares/DTOs/postUpdateDTO';
import { Router } from 'express';

const router = Router();
// 게시판 목록 조회
router.get('/', validator(PostGetDTO), PostsController.getAllPosts);
// 게시글 상세 조회
router.get('/:postId', validator(PostGetOneDTO), PostsController.getPost);
// 게시글 작성
router.post('/', authenticateAccessToken, validator(PostCreateDTO), PostsController.createPost);
// 게시글 수정
router.put('/:postId', authenticateAccessToken, validator(PostUpdateDTO), PostsController.updatePost);
// 게시글 삭제
router.delete('/:postId', authenticateAccessToken, validator(PostGetOneDTO), PostsController.deletePost);

export default router;
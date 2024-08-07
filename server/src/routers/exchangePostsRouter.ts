import { Router, Request, Response } from 'express';

import ExchangePostsController from '@_controllers/exchangePostsController';
import { authenticateAccessToken, validator } from '@_middlewares';
import ExchangeGetDTO from '@_/middlewares/DTOs/exchangeGetDTO';
import PostGetOneDTO from '@_/middlewares/DTOs/postGetOneDTO';
import ExchangeCreateDTO from '@_/middlewares/DTOs/exchangeCreateDTO';
import ExchangeUpdateDTO from '@_/middlewares/DTOs/exchangeUpdateDTO';
import ExchangeStatusDTO from '@_/middlewares/DTOs/exchangeStatusDTO';

const router = Router();

// 중고 거래 게시판
// 목록 조회
// 쿼리 파라미터의 page와 perPage가 숫자 형태를 한 string이 맞는지 joi 검사
router.get('/', validator(ExchangeGetDTO), ExchangePostsController.findPosts);
// 게시글 조회
router.get('/:postId', validator(PostGetOneDTO), ExchangePostsController.findOnePost);
// 게시글 생성
router.post('/', authenticateAccessToken, validator(ExchangeCreateDTO), ExchangePostsController.createPost);
// 게시글 상태 변경
router.put('/status', authenticateAccessToken, validator(ExchangeStatusDTO), ExchangePostsController.updatePostStatus);
// 게시글 수정
router.put('/:postId', authenticateAccessToken, validator(ExchangeUpdateDTO), ExchangePostsController.updatePost);
// 게시글 삭제
router.delete('/:postId', authenticateAccessToken, validator(PostGetOneDTO), ExchangePostsController.deletePost);

export default router;
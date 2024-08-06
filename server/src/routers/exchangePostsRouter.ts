import { Router, Request, Response } from 'express';

import ExchangePostsController from '@_controllers/exchangePostsController';
import { authenticateAccessToken } from '@_middlewares';
import { pagesToNumber } from '@_/middlewares';

const router = Router();

// 중고 거래 게시판
// 목록 조회
// 쿼리 파라미터의 page와 perPage가 숫자 형태를 한 string이 맞는지 joi 검사
router.get('/', pagesToNumber, ExchangePostsController.findPosts);
// 게시글 조회
router.get('/:postId', ExchangePostsController.findOnePost);
// 게시글 생성
router.post('/', authenticateAccessToken, ExchangePostsController.createPost);
// 게시글 상태 변경
router.put('/status', authenticateAccessToken, ExchangePostsController.updatePostStatus);
// 게시글 수정
router.put('/:postId', authenticateAccessToken, ExchangePostsController.updatePost);
// 게시글 삭제
router.delete('/:postId', authenticateAccessToken, ExchangePostsController.deletePost);

export default router;
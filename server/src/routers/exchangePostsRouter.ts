import { Router, Request, Response } from 'express';

const router = Router();

// 중고 거래 게시판
// 목록 조회
router.get('/', exchangePostsController.find);

router.get('/:postExchangeId')

router.post('/')
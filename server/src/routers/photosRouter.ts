import { Router, Request, Response } from 'express';

const router = Router();
// aws s3에 사진을 업로드하는 api
// 업로드 후 사진 주소를 반환, 해당 주소를 이용하여 프사나 게시글 이미지로 등록
router.post('/');

export default router;
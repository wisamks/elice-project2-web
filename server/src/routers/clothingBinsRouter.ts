import { Router } from 'express';
import { getClothingBins } from '@_/controllers/clothingBinsController';

const clothingBinsRouter = Router();

// 의류 수거함 관련 라우트 정의
clothingBinsRouter.get('/', getClothingBins);

export default clothingBinsRouter;
import { Router } from 'express';

import upload from '@_middlewares/uploadImage';
import ImagesController from '@_controllers/imagesController';
import { authenticateAccessToken } from '@_/middlewares';

const router = Router();

router.post('/upload', authenticateAccessToken, upload, ImagesController.putImages);

export default router;
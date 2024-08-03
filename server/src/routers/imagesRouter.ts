import { Router } from 'express';

import upload from '@_middlewares/uploadImage';
import ImagesController from '@_controllers/imagesController';

const router = Router();

router.post('/upload', upload.array('images', 10), ImagesController.putImages);

export default router;
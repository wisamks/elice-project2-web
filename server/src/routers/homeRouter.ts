import HomeController from '@_/controllers/homeController';
import { Router } from 'express';

const router = Router();

router.get('/', HomeController.getAllPosts);

export default router;
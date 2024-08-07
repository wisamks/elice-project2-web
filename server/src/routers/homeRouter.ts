import { Router } from 'express';

import HomeController from '@_/controllers/homeController';
import HomeGetDTO from '@_/middlewares/DTOs/homeGetDTO';
import { validator } from '@_/middlewares';

const router = Router();

router.get('/', validator(HomeGetDTO), HomeController.getAllPosts);

export default router;
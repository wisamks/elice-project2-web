import { ReqUser } from '@_/customTypes/express';
import HomeGetDTO from '@_/middlewares/DTOs/homeGetDTO';
import HomeService from '@_/services/homeService';
import { Request, Response, NextFunction } from 'express';

class HomeController {
    static async getAllPosts(req: Request, res: Response, next: NextFunction) {
        const { exchangeLimit, binLimit, reformLimit, userId }: HomeGetDTO = req.body;
        try {
            const [exchangePosts, reformPosts, binPosts] = await Promise.all([
                HomeService.getExchangeByLimit(exchangeLimit, userId),
                HomeService.getReformByLimit(reformLimit, userId),
                HomeService.getBinByLimit(binLimit, userId),
            ]);
            return res.status(200).json({
                exchangePosts,
                reformPosts,
                binPosts,
            });
        } catch(err) {
            return next(err);
        }
    }
}

export default HomeController;
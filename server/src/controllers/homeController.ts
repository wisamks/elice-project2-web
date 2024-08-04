import { ReqUser } from '@_/customTypes/express';
import HomeService from '@_/services/homeService';
import { Request, Response, NextFunction } from 'express';

class HomeController {
    static async getAllPosts(req: Request, res: Response, next: NextFunction) {
        const {exchangeLimit, binLimit, reformLimit} = req.query;
        const user = req.user as ReqUser|undefined;
        const userId = user?.userId;
        try {
            const [exchangePosts, reformPosts, binPosts] = await Promise.all([
                HomeService.getExchangeByLimit(exchangeLimit as string, userId),
                HomeService.getReformByLimit(reformLimit as string, userId),
                HomeService.getBinByLimit(binLimit as string, userId),
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
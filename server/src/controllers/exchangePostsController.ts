import {Request, Response, NextFunction} from 'express';

class exchangePostsController {
    static async findPosts (req: Request, res: Response, next: NextFunction) {
        const {perPage, page} = req.query;
        
    }
}

export default exchangePostsController;
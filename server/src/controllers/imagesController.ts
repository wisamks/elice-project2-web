import {Request, Response, NextFunction} from 'express';

class ImagesController {
    static async putImages(req: Request, res: Response, next: NextFunction) {
        try {
            const files = req.files as any;
            const urls = files.images.map(image => image.location);
            res.status(200).json({ urls });
        } catch (err) {
            next(err);
        }
    }
}

export default ImagesController;
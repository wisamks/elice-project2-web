import { Image } from '@_/customTypes/imagesType';
import { InternalServerError } from '@_/utils/customError';
import { Request, Response, NextFunction } from 'express';

class ImagesController {
    static async putImages(req: Request, res: Response, next: NextFunction) {
        try {
            const files = req.files as {images: Array<Image>}|undefined;
            if (files === undefined) {
                throw new InternalServerError('이미지 url을 생성하는 데 실패했습니다.');
            }
            const urls = files.images.map((image: Image) => image.location);
            res.status(200).json({ urls });
        } catch (err) {
            next(err);
        }
    }
}

export default ImagesController;
import { PostSort } from '@_/customTypes/postType';
import {Request, Response, NextFunction} from 'express';

const pagesToNumber = (req: Request, res: Response, next: NextFunction) => {
    const {
        page = 1,
        perPage = 40,
        categoryId,
        sort,
        target,
        item,
        price,
        location
    } = req.query;
    req.paginations = {
        page: Number(page),
        perPage: Number(perPage),
        categoryId: Number(categoryId),
    }
    req.filters = {
        sort: sort as PostSort|undefined,
        target: target as string|undefined,
        item: item as string|undefined,
        price: price === undefined ? undefined : Number(price),
        location: location as string|undefined,
    }

    return next();
}

export default pagesToNumber;
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
    } = req.params;
    req.paginations = {
        page: Number(page),
        perPage: Number(perPage),
        categoryId: Number(categoryId),
    }
    req.filters = {
        sort: sort as PostSort,
        target,
        item,
        price: Number(price),
        location
    }

    return next();
}

export default pagesToNumber;
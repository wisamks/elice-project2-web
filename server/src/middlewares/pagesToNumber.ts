import { Request, Response, NextFunction } from "express"

const pagesToNumber = (req: Request, res: Response, next: NextFunction) => {
    const { page, perPage, categoryId } = req.query;
    const _categoryId = Number(categoryId);
    const _page = page ? Number(page) : 1;
    const _perPage = perPage ? Number(perPage) : 40;
    req.pagination = {page: _page, perPage: _perPage, categoryId: _categoryId}
}

export default pagesToNumber;
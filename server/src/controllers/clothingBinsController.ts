import { Request, Response, NextFunction } from 'express';
import { fetchClothingBinsData } from '../services/clothingBinsService';

// 의류 수거함 데이터를 가져오는 컨트롤러
export const getClothingBins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allData = await fetchClothingBinsData();
        return res.status(200).json(allData);
    } catch (error) {
        return next(error);
    }
};

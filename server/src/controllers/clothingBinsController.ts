import { Request, Response } from 'express';
import { fetchClothingBinsData } from '../services/clothingBinsService';

// 의류 수거함 데이터를 가져오는 컨트롤러
export const getClothingBins = async (req: Request, res: Response) => {
    try {
        const allData = await fetchClothingBinsData();
        res.json(allData);
    } catch (error) {
        console.error('Error fetching public data:', error.response?.data || error.message);
        res.status(500).json({ error: '의류 수거함 위치를 가져오는 데 실패했습니다.' });
    }
};

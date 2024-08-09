import axios from 'axios';
import { apiEndpoints, mappingFunctions } from '../config/apiEndpoints';

interface ClothingBinData {
    district: string;
    roadAddress: string;
    latitude: number | null;
    longitude: number | null;
}

interface ApiResponse {
    data: any[]; // 실제 데이터 구조에 맞게 타입 정의
}

// 의류 수거함 데이터를 외부 API로부터 가져오는 서비스
export const fetchClothingBinsData = async (): Promise<ClothingBinData[]> => {
    const fetchPromises = apiEndpoints.map(api =>
        axios.get<ApiResponse>(api.endpoint, {
            params: {
                page: 1,
                perPage: 100,
                serviceKey: process.env.PUBLIC_DATA_API_KEY, // 디코딩하지 않고 사용
            }
        })
    );

    const responses = await Promise.all(fetchPromises);

    // 데이터를 변환하여 병합
    return responses.flatMap(response => {
        const district = apiEndpoints.find(api => api.endpoint === response.config.url)?.gu;
        if (!district) {
            throw new Error('District not found for endpoint');
        }
        const mappingFunction = mappingFunctions[district];

        return response.data.data.map((item: any) => mappingFunction(item));
    });
};

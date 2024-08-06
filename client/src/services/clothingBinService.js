import axios from 'axios';

const getClothingBins = async () => {
    try {
        const response = await axios.get('/api/clothing-bins');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch clothing bins:', error);
        throw error; // 오류를 다시 던져서 상위 컴포넌트에서 처리할 수 있게 합니다.
    }
};

export default getClothingBins;

// API 엔드포인트 및 각 구별 매핑 함수

export const apiEndpoints = [
    { gu: '서대문구', endpoint: 'https://api.odcloud.kr/api/15068863/v1/uddi:2682c872-adbe-4623-9e29-a53467734a88' },
    { gu: '성북구', endpoint: 'https://api.odcloud.kr/api/15127036/v1/uddi:f3c82d6f-498a-4e75-989b-e3fdc4720413' },
    { gu: '강남구', endpoint: 'https://api.odcloud.kr/api/15127131/v1/uddi:a9873b46-9551-407a-aff5-a3a77befb3d4' },
    { gu: '동작구', endpoint: 'https://api.odcloud.kr/api/15068021/v1/uddi:11168719-6301-4ff2-873d-e44e26511d89' },
    { gu: '관악구', endpoint: 'https://api.odcloud.kr/api/15076398/v1/uddi:6dec2a8d-6404-4318-8767-85419b3c45a0' },
    { gu: '구로구', endpoint: 'https://api.odcloud.kr/api/15068871/v1/uddi:3fd97c80-6a9e-4d53-b65e-937d28de0605' },
    { gu: '광진구', endpoint: 'https://api.odcloud.kr/api/15109594/v1/uddi:d63e68bf-e03d-4d3c-a203-fd9add3d372c' },
    { gu: '영등포구', endpoint: 'https://api.odcloud.kr/api/15106473/v1/uddi:c0982c3d-865d-4a96-897c-a67f24baeed5' },
    { gu: '양천구', endpoint: 'https://api.odcloud.kr/api/15105196/v1/uddi:3d00d6b8-e766-4b2e-990e-b6d310b9e792' },
    { gu: '종로구', endpoint: 'https://api.odcloud.kr/api/15104622/v1/uddi:34ca4455-457d-4a50-ad1a-9b373f0f08eb' },
    { gu: '금천구', endpoint: 'https://api.odcloud.kr/api/15106679/v1/uddi:2a54e58d-6b54-46de-9de1-cc3a6887ccb8' },
    { gu: '동대문구', endpoint: 'https://api.odcloud.kr/api/15112228/v1/uddi:67d42349-302e-40f6-af11-c496e532d090' },
    { gu: '강서구', endpoint: 'https://api.odcloud.kr/api/15127065/v1/uddi:61d05f04-08d8-4e4f-ba17-8d6690775590' },
    { gu: '성동구', endpoint: 'https://api.odcloud.kr/api/15126958/v1/uddi:b8d0dfd5-cefa-4cb2-8d35-fc6b5f2507b0' },
    { gu: '중랑구', endpoint: 'https://api.odcloud.kr/api/15127304/v1/uddi:78d8746d-a497-4d27-9c0a-ddc69e71710f' },
  
];

// 각 구별 매핑
export const mappingFunctions: { [key: string]: (item: any) => any } = {
    '서대문구': (item) => ({
        district: '서대문구',
        roadAddress: item['설치장소(도로명)'] || item['도로명주소'] || '주소 정보 없음',
        latitude: parseFloat(item.위도) || null,
        longitude: parseFloat(item.경도) || null,
    }),
    '성북구': (item) => ({
        district: '성북구',
        roadAddress: item['도로명주소'] || '주소 정보 없음',
        latitude: parseFloat(item.위도) || null,
        longitude: parseFloat(item.경도) || null,
    }),
    '강남구': (item) => ({
        district: '강남구',
        roadAddress: item['도로명 주소'] || '주소 정보 없음',
        latitude: parseFloat(item.위도) || null,
        longitude: parseFloat(item.경도) || null,
    }),
    '동작구': (item) => ({
        district: '동작구',
        roadAddress: item['주소'] || '주소 정보 없음',
        latitude: null,
        longitude: null,
    }),
    '관악구': (item) => ({
        district: '관악구',
        roadAddress: item['위치'] || '주소 정보 없음',
        latitude: parseFloat(item.위도) || null,
        longitude: parseFloat(item.경도) || null,
    }),
    '구로구': (item) => ({
        district: '구로구',
        roadAddress: item['주소'] || '주소 정보 없음',
        latitude: null,
        longitude: null,
    }),
    '광진구': (item) => ({
        district: '광진구',
        roadAddress: item['도로명주소'] || item['지번주소'] || '주소 정보 없음',
        latitude: null,
        longitude: null,
    }),
    '영등포구': (item) => ({
        district: '영등포구',
        roadAddress: item['도로명주소'] || '주소 정보 없음',
        latitude: parseFloat(item.위도) || null,
        longitude: parseFloat(item.경도) || null,
    }),
    '양천구': (item) => ({
        district: '양천구',
        roadAddress: item['도로명주소'] || '주소 정보 없음',
        latitude: parseFloat(item.위도) || null,
        longitude: parseFloat(item.경도) || null,
    }),
    '종로구': (item) => ({
        district: '종로구',
        roadAddress: item['도로명주소'] || '주소 정보 없음',
        latitude: parseFloat(item.위도) || null,
        longitude: parseFloat(item.경도) || null,
    }),
    '금천구': (item) => ({
        district: '금천구',
        roadAddress: item['도로명주소'] || '주소 정보 없음',
        latitude: parseFloat(item.위도) || null,
        longitude: parseFloat(item.경도) || null,
    }),
    '동대문구': (item) => ({
        district: '동대문구',
        roadAddress: item['주소'] || '주소 정보 없음',
        latitude: parseFloat(item.위도) || null,
        longitude: parseFloat(item.경도) || null,
    }),
    '강서구': (item) => ({
        district: '강서구',
        roadAddress: item['설치장소(도로명주소)'] || '주소 정보 없음',
        latitude: parseFloat(item.위도) || null,
        longitude: parseFloat(item.경도) || null,
    }),
    '성동구': (item) => ({
        district: '성동구',
        roadAddress: item['설치장소'] || '주소 정보 없음',
        latitude: null,
        longitude: null,
    }),
    '중랑구': (item) => ({
        district: '중랑구',
        roadAddress: item['도로명주소'] || '주소 정보 없음',
        latitude: parseFloat(item.위도) || null,
        longitude: parseFloat(item.경도) || null,
    }),
};

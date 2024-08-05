import { baseURI } from './baseURI';

export const authTokenValidController = async (apiClient) => {
  const fetchURI = `${baseURI}/api/auth/access`;

  const response = await apiClient.post(
    fetchURI,
    {},
    {
      withCredentials: true,
    }
  );

  // 데이터 serialize
  const isTokenValid = response.status === 200;

  return { data: isTokenValid };
};

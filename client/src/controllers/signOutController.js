import { baseURI } from './baseURI';

export const signOutController = async (apiClient) => {
  const fetchURI = `${baseURI}/api/auth/logout`;

  const response = await apiClient.post(
    fetchURI,
    {},
    {
      withCredentials: true,
    }
  );

  // 데이터 serialize
  const isLoggedOut = response.status === 204;

  console.log(`response in signOutController`, response);

  return { data: isLoggedOut };
};

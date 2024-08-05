import apiInterceptors from './apiInterceptors';

export const apiService = async (controller, data, model) => {
  try {
    const response = await controller(apiInterceptors, data);

    console.log(`리스폰스 in apiService`, response);

    // if (!response.ok) {
    //     throw new Error('Network response was not ok');
    // }

    if (model) {
      model(response.data);
    }

    return response.data;
  } catch (error) {
    console.error(`Error:`, error);
  }
};

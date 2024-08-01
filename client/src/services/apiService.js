import apiInterceptors from "./apiInterceptors";

export const apiService = async (controller, model) => {
    try{
        const response = await controller(apiInterceptors);

        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }

        const res = response.data;

        if(model){
            model(res);
        };
        
        return res;

    } catch (error) {
        console.error(`Error:`, error);
    }
};
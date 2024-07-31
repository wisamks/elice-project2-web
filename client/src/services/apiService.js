export const apiService = async (controller, model) => {
    try{
        const response = await controller();

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const res = await response.json();

        if(model){
            model(res);
        };
        
        return res;

    } catch (error) {
        console.error(`Error:`, error);
    }
};
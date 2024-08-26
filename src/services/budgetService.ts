import {axiosInstance} from './axios'

export const createBudget = async (budget): Promise<any> => {
    const response = await axiosInstance.post("api/v1/budgets/create", budget);
    return response.data.income;
};
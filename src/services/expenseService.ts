import {axiosInstance} from './axios'
import {IExpense} from '../utils/types'

export const getExpenses = async (): Promise<IExpense[]> => {
    const response = await axiosInstance.get("api/v1/expenses/all");
    return response.data.expenses;
};

export const searchExpenses = async (queryParams: object): Promise<IExpense[]> => {
    const response = await axiosInstance.get("api/v1/expenses/search", {params: queryParams});
    return response.data.expenses;
};
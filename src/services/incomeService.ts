import {axiosInstance} from './axios'
import {IIncome, IncomeData} from '../utils/types'

export const getIncomes = async (): Promise<IIncome[]> => {
    const response = await axiosInstance.get("api/v1/incomes/all");
    return response.data.incomes;
};

export const createIncomes = async (income: IncomeData): Promise<IIncome[]> => {
    const response = await axiosInstance.post("api/v1/incomes/create", income);
    return response.data.income;
};

export const searchIncomes = async (queryParams: object): Promise<IIncome[]> => {
    const response = await axiosInstance.get("api/v1/incomes/search", {params: queryParams});
    return response.data.incomes;
};

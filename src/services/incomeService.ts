import {axiosInstance} from './axios'
import {IIncome, IncomeData, SearchIncomes} from '../utils/types'

export const getIncomes = async (): Promise<IIncome[]> => {
    const response = await axiosInstance.get("api/v1/income/all");
    return response.data.incomes;
};

export const getIncomeById = async (incomeId: string): Promise<IIncome> => {
    const response = await axiosInstance.get(`api/v1/income/${incomeId}`);
    return response.data.income;
};

export const createIncomes = async (payload: {income: IncomeData}): Promise<IIncome> => {
    const response = await axiosInstance.post("api/v1/income/create", payload.income);
    
    return response.data.income;
};

export const searchIncomes = async (queryParams: URLSearchParams): Promise<SearchIncomes> => {
    const response = await axiosInstance.get("api/v1/income/search", {params: queryParams});
    return response.data;
};

export const updateIncomes = async (payload: {income: IncomeData, incomeId?: string} ): Promise<IIncome> => {
    const {income, incomeId} = payload
    if(!incomeId){
        throw new Error('Income id is required')
    }
    const response = await axiosInstance.put(`api/v1/income/${incomeId}`, income);
    
    return response.data.income;
};

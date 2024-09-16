import {axiosInstance} from './axios'
import {BudgetData, IBudget} from '../utils/types'
export const createBudget = async (budget:BudgetData): Promise<IBudget> => {
    const response = await axiosInstance.post("api/v1/budgets/create", budget);
    return response.data.income;
};
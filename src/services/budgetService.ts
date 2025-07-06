import {axiosInstance} from './axios'
import {BudgetData, IBudget, SearchBudgets} from '../utils/types'
import {categories_types} from '../utils/util'

export const createBudget = async (budget:BudgetData): Promise<IBudget> => {
    const payload = {
        ...budget,
        budget: budget.budget.map((v)=>({
            ...v,
            type: categories_types[v.category as keyof typeof categories_types]
        }))
    }
    const response = await axiosInstance.post("api/v1/budgets/create", payload);
    return response.data.income;
};

export const getBudgets  = async (): Promise<IBudget[]> => {
    const response = await axiosInstance.get("api/v1/budgets/all");
    return response.data.budgets
}

export const searchBudgets = async (queryParams: URLSearchParams): Promise<SearchBudgets> => {
    const response = await axiosInstance.get("api/v1/budget/search", {params: queryParams});
    return response.data;
};
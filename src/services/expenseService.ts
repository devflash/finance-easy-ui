import {axiosInstance} from './axios'
import {ExpenseData, IExpense} from '../utils/types'

export const getExpenses = async (): Promise<IExpense[]> => {
    const response = await axiosInstance.get("api/v1/expenses/all");
    return response.data.expenses;
};

export const searchExpenses = async (queryParams: object): Promise<IExpense[]> => {
    const response = await axiosInstance.get("api/v1/expenses/search", {params: queryParams});
    return response.data.expenses;
};

export const createExpenses = async (payload: {expense: ExpenseData}): Promise<IExpense> => {
    const response = await axiosInstance.post("api/v1/expenses/create", payload.expense);
    return response.data.expense;
};

export const updateExpenses = async (payload: {expense: ExpenseData, expenseId?: string} ): Promise<IExpense> => {
    const {expense, expenseId} = payload
    if(!expenseId){
        throw new Error('Expense id is required')
    }
    const response = await axiosInstance.put(`api/v1/expenses/${expenseId}`, expense);
    
    return response.data.expense;
};

export const getExpenseById = async (expenseId: string): Promise<IExpense> => {
    const response = await axiosInstance.get(`api/v1/expense/${expenseId}`);
    return response.data.expense;
};
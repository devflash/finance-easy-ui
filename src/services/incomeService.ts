import axios from "axios";
import {IIncome} from '../utils/types'
export const getIncomes = async (): Promise<IIncome[]> => {
    const response = await axios.get("api/v1/incomes/all");
    return response.data.incomes;
};

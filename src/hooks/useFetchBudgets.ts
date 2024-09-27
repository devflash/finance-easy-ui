import { useQuery } from "@tanstack/react-query";
import {getBudgets} from '../services/budgetService'
export const useFetchBudgets = () => {
    return useQuery({queryKey: ['budgets'], queryFn: getBudgets})
}
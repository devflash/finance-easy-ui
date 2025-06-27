import { useQuery } from "@tanstack/react-query";
import {searchBudgets} from '../../services/budgetService'

export const useSearchBudgets= (searchParams: URLSearchParams) => {
    return useQuery({ queryKey: ["budgets", searchParams.size > 0 ? searchParams.toString() : 'all'], queryFn: () => searchBudgets(searchParams) });
}
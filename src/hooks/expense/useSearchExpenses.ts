import { useQuery } from "@tanstack/react-query";
import { searchExpenses } from "../../services/expenseService";

export const useSearchExpenses= (searchParams: URLSearchParams) => {
    return useQuery({ queryKey: ["expenses", searchParams.size > 0 ? searchParams.toString() : 'all'], queryFn: () => searchExpenses(searchParams) });
}

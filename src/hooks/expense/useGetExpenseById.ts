import { useQuery } from "@tanstack/react-query";
import { getExpenseById } from "../../services/expenseService";
export const useGetExpenseById= (expenseId: string) => {
    return useQuery({ queryKey: ["expense", expenseId], queryFn: () => getExpenseById(expenseId) });
}

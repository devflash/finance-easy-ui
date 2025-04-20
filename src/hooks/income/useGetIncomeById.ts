import { useQuery } from "@tanstack/react-query";
import { getIncomeById } from "../../services/incomeService";
export const useGetIncomeById= (incomeId: string) => {
    return useQuery({ queryKey: ["income", incomeId], queryFn: () => getIncomeById(incomeId) });
}

import { useQuery } from "@tanstack/react-query";
import { searchIncomes } from "../services/incomeService";
export const useSearchIncomes= (searchParams: object) => {
    return useQuery({ queryKey: ["incomes", searchParams.toString()], queryFn: () => searchIncomes(searchParams) });
}

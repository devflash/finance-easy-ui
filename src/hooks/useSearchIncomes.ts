import { useQuery } from "@tanstack/react-query";
import { searchIncomes } from "../services/incomeService";

export const useSearchIncomes= (searchParams: URLSearchParams) => {
    return useQuery({ queryKey: ["incomes", searchParams.size > 1 ? searchParams.toString() : 'all'], queryFn: () => searchIncomes(searchParams) });
}

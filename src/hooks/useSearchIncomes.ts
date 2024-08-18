import { useQuery } from "@tanstack/react-query";
import { searchIncomes } from "../services/incomeService";
import {useSearchParams} from 'react-router-dom'
export const useSearchIncomes= () => {
    const [searchParams] = useSearchParams();
    return useQuery({ queryKey: ["incomes", searchParams.toString()], queryFn: () => searchIncomes(searchParams) });
}
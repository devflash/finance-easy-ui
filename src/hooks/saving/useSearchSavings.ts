import { useQuery } from "@tanstack/react-query";
import { searchSavings } from "../../services/savingService";

export const useSearchSavings= (searchParams: URLSearchParams) => {
    return useQuery({ queryKey: ["savings", searchParams.size > 0 ? searchParams.toString() : 'all'], queryFn: () => searchSavings(searchParams) });
}

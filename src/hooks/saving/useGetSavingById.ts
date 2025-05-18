import { useQuery } from "@tanstack/react-query";
import { getSavingById } from "../../services/savingService";
export const useGetSavingById= (savingId: string) => {
    return useQuery({ queryKey: ["saving", savingId], queryFn: () => getSavingById(savingId) });
}

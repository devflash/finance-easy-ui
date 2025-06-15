import { useQuery } from "@tanstack/react-query";
import { getBanks } from "../../services/userServices";

export const useGetBanks= () => {
    return useQuery({ queryKey: ["banks"], queryFn: () => getBanks() });
}

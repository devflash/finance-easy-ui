import { useQuery } from "@tanstack/react-query";
import { getCards } from "../../services/userServices";
export const useGetcards= () => {
    return useQuery({ queryKey: ["cards"], queryFn: () => getCards() });
}

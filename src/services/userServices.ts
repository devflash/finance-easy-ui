import {axiosInstance} from './axios'
import {ICard, ICardData} from '../utils/types'

export const getCards = async (): Promise<ICard[]> => {
    const response = await axiosInstance.get("api/v1/user/profile/cards");
    return response.data.cards;
};

export const addCard = async (card: ICardData): Promise<ICardData[]> => {
    const response = await axiosInstance.post("api/v1/user/profile/cards/add", card);
    return response.data;
};
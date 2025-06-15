import {axiosInstance} from './axios'
import {ICard, ICardData, IBankAccounts, IBankAccountsData} from '../utils/types'

export const getCards = async (): Promise<ICard[]> => {
    const response = await axiosInstance.get("api/v1/user/profile/cards");
    return response.data.cards;
};

export const addCard = async (card: ICardData): Promise<ICardData[]> => {
    const response = await axiosInstance.post("api/v1/user/profile/cards/add", card);
    return response.data;
};

export const getBanks = async (): Promise<IBankAccounts[]> => {
    const response = await axiosInstance.get("api/v1/user/profile/banks");
    return response.data.banks;
};

export const addBank = async (bank: IBankAccountsData): Promise<IBankAccountsData[]> => {
    const response = await axiosInstance.post("api/v1/user/profile/banks/add", bank);
    return response.data;
};
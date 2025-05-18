import {axiosInstance} from './axios'
import {ISaving, SavingData, SearchSavings} from '../utils/types'

export const getSavings = async (): Promise<ISaving[]> => {
    const response = await axiosInstance.get("api/v1/saving/all");
    return response.data.savings;
};

export const getSavingById = async (savingId: string): Promise<ISaving> => {
    const response = await axiosInstance.get(`api/v1/saving/${savingId}`);
    return response.data.saving;
};

export const createSavings = async (payload: {saving: SavingData}): Promise<ISaving> => {
    const response = await axiosInstance.post("api/v1/saving/create", payload.saving);
    
    return response.data.saving;
};

export const searchSavings = async (queryParams: URLSearchParams): Promise<SearchSavings> => {
    const response = await axiosInstance.get("api/v1/saving/search", {params: queryParams});
    return response.data;
};

export const updateSaving = async (payload: {saving: SavingData, savingId?: string} ): Promise<ISaving> => {
    const {saving, savingId} = payload
    if(!savingId){
        throw new Error('Saving id is required')
    }
    const response = await axiosInstance.put(`api/v1/saving/${savingId}`, saving);
    
    return response.data.saving;
};

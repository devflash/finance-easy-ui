import {UserSignup} from '../utils/types'
import {axiosInstance} from './axios'
export const createAccount = async (userData: UserSignup) => {
    const response = await axiosInstance.post('api/v1/user/register', userData)
    return response.data
}
import {useQuery} from '@tanstack/react-query'
import {getPaymentMethods} from '../../services/userServices'

export const useGetPaymentMethods = () => {
    return useQuery({
        queryKey: ['payment-methods'],
        queryFn: ()=> getPaymentMethods()
    })
}
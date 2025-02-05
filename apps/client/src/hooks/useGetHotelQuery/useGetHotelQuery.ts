import { apiClient } from '@/libs/apiClient'
import { Hotel } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useGetHotelQuery = (hotelId: string) => {
    const getHotelQuery = useQuery<Hotel>({
        queryKey: ['hotels', hotelId],

        queryFn: () => fetchHotel(hotelId),

        retry: false,
    })

    return getHotelQuery
}

const fetchHotel = async (hotelId: string) => {
    const response = await apiClient.get(`/hotels/${hotelId}`)

    if (!response.ok) {
        throw new Error('An error occurred while fetching the hotel')
    }

    return response.json() as Promise<Hotel>
}

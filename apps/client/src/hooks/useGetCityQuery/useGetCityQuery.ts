import { apiClient } from '@/libs/apiClient'
import { City } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useGetCityQuery = (hotelId: string) => {
    const getCityQuery = useQuery<City>({
        queryKey: ['cities', hotelId],

        queryFn: () => fetchCity(hotelId),

        retry: false,
    })

    return getCityQuery
}

const fetchCity = async (hotelId: string) => {
    const response = await apiClient.get(`/cities/${hotelId}`)

    if (!response.ok) {
        throw new Error('An error occurred while fetching the hotel')
    }

    return response.json() as Promise<City>
}

import { apiClient } from '@/libs/apiClient'
import { Country } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useGetCountryQuery = (hotelId: string) => {
    const getCountryQuery = useQuery<Country>({
        queryKey: ['countries', hotelId],

        queryFn: () => fetchCountry(hotelId),

        retry: false,
    })

    return getCountryQuery
}

const fetchCountry = async (hotelId: string) => {
    const response = await apiClient.get(`/countries/${hotelId}`)

    if (!response.ok) {
        throw new Error('An error occurred while fetching the country')
    }

    return response.json() as Promise<Country>
}

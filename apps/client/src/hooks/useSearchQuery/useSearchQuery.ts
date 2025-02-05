import { apiClient } from '@/libs/apiClient'
import { SearchResult } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useSearchQuery = (query: string) => {
    const searchQuery = useQuery<SearchResult>({
        queryKey: ['search', query],

        queryFn: async () => {
            const response = await apiClient.get(`/search?q=${query}`)

            if (!response.ok) {
                throw new Error(
                    'An error occurred while fetching the search results',
                )
            }

            return response.json()
        },
    })

    return searchQuery
}

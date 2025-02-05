import { apiClient } from '@/libs/apiClient'
import { SearchResult } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useSearchQuery = (query: string) => {
    const searchQuery = useQuery<SearchResult>({
        queryKey: ['search', query],

        queryFn: async () => fetchSearchResults(query),

        retry: false,
    })

    return searchQuery
}

const fetchSearchResults = async (query: string) => {
    const response = await apiClient.get(`/search?q=${query}`)

    if (!response.ok) {
        throw new Error('An error occurred while fetching the search results')
    }

    return response.json() as Promise<SearchResult>
}

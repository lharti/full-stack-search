import { useQuery } from '@tanstack/react-query'

export const useSearchQuery = (query: string) => {
    const searchQuery = useQuery({
        queryKey: ['search', query],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/search?q=${query}`,
            )

            return res.json()
        },
    })

    return searchQuery
}

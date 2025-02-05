import { vi } from 'vitest'

const useQuery = vi.fn(async ({ queryFn }) => {
    try {
        const queryResult = await queryFn()

        return {
            data: queryResult,
            isSuccess: true,
        }
    } catch (error) {
        return {
            error,
            isError: true,
        }
    }
})

const QueryClientProvider = vi.fn()
const QueryClient = vi.fn()

const ReactQueryModule = await vi.importActual('@tanstack/react-query')

module.exports = {
    ...ReactQueryModule,
    QueryClientProvider,
    QueryClient,
    useQuery,
}

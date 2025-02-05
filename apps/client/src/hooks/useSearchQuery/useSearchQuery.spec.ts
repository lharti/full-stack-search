import { apiClient } from '@/libs/apiClient'
import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useSearchQuery } from './useSearchQuery'

vi.mock('@tanstack/react-query')

vi.mock('@/libs/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}))

const useQueryMock = vi.mocked(useQuery)
const apiClientMock = vi.mocked(apiClient)

describe('useSearchQuery', () => {
    it('should fetch search result from api', () => {
        expect.assertions(1)

        const query = 'Hilto'

        renderHook(() => useSearchQuery(query))

        expect(apiClientMock.get).toHaveBeenCalledExactlyOnceWith(
            `/search?q=${query}`,
        )
    })

    it('should setup search query', () => {
        expect.assertions(1)

        const query = 'Inn'

        renderHook(() => useSearchQuery(query))

        expect(useQueryMock).toHaveBeenCalledExactlyOnceWith({
            queryKey: ['search', query],
            queryFn: expect.any(Function),

            retry: false,
        })
    })

    it('should return api response', async () => {
        expect.assertions(1)

        const apiResponse = {
            ok: true,
            json: () => ({
                hotels: [
                    {
                        hotelName: 'Hotel Name',
                        hotelId: '67a11f7a83c0bfd553c0927e',
                        matchScore: 0.8,
                    },
                ],

                cities: [],
                countries: [],
            }),
        }

        // @ts-expect-error - no need to mock full apiResponse
        apiClientMock.get.mockResolvedValueOnce(apiResponse)

        const { result } = renderHook(() => useSearchQuery('Hotel'))

        await expect(result.current).resolves.toStrictEqual({
            data: apiResponse.json(),
            isSuccess: true,
        })
    })

    it('should return error if request failed ', () => {
        expect.assertions(1)

        apiClientMock.get.mockResolvedValueOnce(
            // @ts-expect-error - no need to mock full apiResponse
            {
                ok: false,
            },
        )

        const { result } = renderHook(() => useSearchQuery('Cheap'))

        expect(result.current).resolves.toStrictEqual({
            error: new Error(
                'An error occurred while fetching the search results',
            ),
            isError: true,
        })
    })
})

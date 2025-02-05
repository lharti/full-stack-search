import { apiClient } from '@/libs/apiClient'
import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useGetHotelQuery } from './useGetHotelQuery'

vi.mock('@tanstack/react-query')

vi.mock('@/libs/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}))

const useQueryMock = vi.mocked(useQuery)
const apiClientMock = vi.mocked(apiClient)

describe('useGetHotelQuery', () => {
    it('should fetch hotel from api', () => {
        expect.assertions(1)

        const hotelId = '67a11f7a83c0bfd553c0927e'

        renderHook(() => useGetHotelQuery(hotelId))

        expect(apiClientMock.get).toHaveBeenCalledExactlyOnceWith(
            `/hotels/${hotelId}`,
        )
    })

    it('should setup get hotel query', () => {
        expect.assertions(1)

        const targetId = Math.random().toString()

        renderHook(() => useGetHotelQuery(targetId))

        expect(useQueryMock).toHaveBeenCalledExactlyOnceWith({
            queryKey: ['hotels', targetId],
            queryFn: expect.any(Function),

            retry: false,
        })
    })

    it('should return api response', async () => {
        expect.assertions(1)

        const apiResponse = {
            ok: true,
            json: () => ({
                name: 'Hotel Name',
            }),
        }

        // @ts-expect-error - no need to mock full apiResponse
        apiClientMock.get.mockResolvedValueOnce(apiResponse)

        const { result } = renderHook(() => useGetHotelQuery('HOTEL_ID'))

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

        const { result } = renderHook(() => useGetHotelQuery('HOTEL_ID'))

        expect(result.current).resolves.toStrictEqual({
            error: new Error('An error occurred while fetching the hotel'),
            isError: true,
        })
    })
})

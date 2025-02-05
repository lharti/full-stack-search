import { apiClient } from '@/libs/apiClient'
import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useGetCountryQuery } from './useGetCountryQuery'

vi.mock('@tanstack/react-query')

vi.mock('@/libs/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}))

const useQueryMock = vi.mocked(useQuery)
const apiClientMock = vi.mocked(apiClient)

describe('useGetCountryQuery', () => {
    it('should fetch country from api', () => {
        expect.assertions(1)

        const countryId = '67a11f7a83c0bfd553c0927e'

        renderHook(() => useGetCountryQuery(countryId))

        expect(apiClientMock.get).toHaveBeenCalledExactlyOnceWith(
            `/countries/${countryId}`,
        )
    })

    it('should setup get country query', () => {
        expect.assertions(1)

        const targetId = Math.random().toString()

        renderHook(() => useGetCountryQuery(targetId))

        expect(useQueryMock).toHaveBeenCalledExactlyOnceWith({
            queryKey: ['countries', targetId],
            queryFn: expect.any(Function),

            retry: false,
        })
    })

    it('should return api response', async () => {
        expect.assertions(1)

        const apiResponse = {
            ok: true,
            json: () => ({
                name: 'Country Name',
            }),
        }

        // @ts-expect-error - no need to mock full apiResponse
        apiClientMock.get.mockResolvedValueOnce(apiResponse)

        const { result } = renderHook(() => useGetCountryQuery('COUNTRY_ID'))

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

        const { result } = renderHook(() => useGetCountryQuery('COUNTRY_ID'))

        expect(result.current).resolves.toStrictEqual({
            error: new Error('An error occurred while fetching the country'),
            isError: true,
        })
    })
})

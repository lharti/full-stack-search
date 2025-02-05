import { SearchResult } from '@/types'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CitiesList } from './CitiesList'
import { CountriesList } from './CountriesList'
import { HotelsList } from './HotelsList'
import { SearchBarResult } from './SearchBarResult'

vi.mock('./HotelsList', () => ({
    HotelsList: vi.fn(() => 'HOTELS_LIST'),
}))

vi.mock('./CitiesList', () => ({
    CitiesList: vi.fn(() => 'CITIES_LIST'),
}))

vi.mock('./CountriesList', () => ({
    CountriesList: vi.fn(() => 'COUNTRIES_LIST'),
}))

const HotelsListMock = vi.mocked(HotelsList)
const CitiesListMock = vi.mocked(CitiesList)
const CountriesListMock = vi.mocked(CountriesList)

describe('SearchBarResult', () => {
    it('should pass hotels links to HotelsList ', () => {
        expect.assertions(1)

        const searchResult: SearchResult = {
            hotels: [
                {
                    hotelId: '1',
                    hotelName: 'Hotel 1',
                    matchScore: 0,
                },
                {
                    hotelId: '2',
                    hotelName: 'Hotel 2',
                    matchScore: 0,
                },
            ],
            countries: [],
            cities: [],
        }

        render(<SearchBarResult searchResult={searchResult} />)

        expect(HotelsListMock).toHaveBeenCalledExactlyOnceWith(
            {
                hotelsLinks: [
                    {
                        id: '1',
                        path: '/hotels/1',
                        title: 'Hotel 1',
                    },
                    {
                        id: '2',
                        path: '/hotels/2',
                        title: 'Hotel 2',
                    },
                ],
            },

            undefined,
        )
    })

    it('should pass countries links to CountriesList ', () => {
        expect.assertions(1)

        const searchResult: SearchResult = {
            hotels: [],
            countries: [
                {
                    _id: '1',
                    name: 'Country 1',
                    isoCode: 'C1',
                },
                {
                    _id: '2',
                    name: 'Country 2',
                    isoCode: 'C2',
                },
            ],
            cities: [],
        }

        render(<SearchBarResult searchResult={searchResult} />)

        expect(CountriesListMock).toHaveBeenCalledExactlyOnceWith(
            {
                countriesLinks: [
                    {
                        id: '1',
                        path: '/countries/1',
                        title: 'Country 1',
                    },
                    {
                        id: '2',
                        path: '/countries/2',
                        title: 'Country 2',
                    },
                ],
            },

            undefined,
        )
    })

    it('should pass cities links to CitiesList ', () => {
        expect.assertions(1)

        const searchResult: SearchResult = {
            hotels: [],
            countries: [],
            cities: [
                {
                    _id: '1',
                    name: 'City 1',
                },
                {
                    _id: '2',
                    name: 'City 2',
                },
            ],
        }

        render(<SearchBarResult searchResult={searchResult} />)

        expect(CitiesListMock).toHaveBeenCalledExactlyOnceWith(
            {
                citiesLinks: [
                    {
                        id: '1',
                        path: '/cities/1',
                        title: 'City 1',
                    },
                    {
                        id: '2',

                        path: '/cities/2',
                        title: 'City 2',
                    },
                ],
            },

            undefined,
        )
    })

    it('should render all lists', () => {
        expect.assertions(1)

        const searchResult: SearchResult = {
            hotels: [
                {
                    hotelId: '1',
                    hotelName: 'Hotel 1',
                    matchScore: 0,
                },
            ],
            countries: [
                {
                    _id: '1',
                    name: 'Country 1',
                    isoCode: 'C1',
                },
            ],
            cities: [
                {
                    _id: '1',
                    name: 'City 1',
                },
            ],
        }

        const { container } = render(
            <SearchBarResult searchResult={searchResult} />,
        )

        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="p-2"
            >
              HOTELS_LIST
              COUNTRIES_LIST
              CITIES_LIST
            </div>
          </div>
        `)
    })
})

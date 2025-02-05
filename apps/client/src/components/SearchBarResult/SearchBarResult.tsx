import { CitiesList } from '@/components/SearchBarResult/CitiesList'
import { CountriesList } from '@/components/SearchBarResult/CountriesList'
import { HotelsList } from '@/components/SearchBarResult/HotelsList/HotelsList'
import { useMemo } from 'react'

export interface SearchBarResultProps {
    searchResult: {
        hotels: {
            hotelName: string
            hotelId: string
        }[]

        cities: {
            _id: string
            name: string
        }[]

        countries: {
            _id: string
            name: string
        }[]
    }
}

export const SearchBarResult: React.FC<SearchBarResultProps> = ({
    searchResult,
}) => {
    const hotelsLinks = useMemo(
        () =>
            searchResult.hotels.map(hotel => ({
                id: hotel.hotelId,
                title: hotel.hotelName,
                path: `/hotels/${hotel.hotelId}`,
            })),

        [searchResult.hotels],
    )

    const countriesLinks = useMemo(
        () =>
            searchResult.countries.map(country => ({
                id: country._id,
                title: country.name,
                path: `/countries/${country._id}`,
            })),

        [searchResult.countries],
    )

    const citiesLinks = useMemo(
        () =>
            searchResult.cities.map(city => ({
                id: city._id,
                title: city.name,
                path: `/cities/${city._id}`,
            })),

        [searchResult.cities],
    )

    return (
        <div className="p-2">
            <HotelsList hotelsLinks={hotelsLinks} />

            <CountriesList countriesLinks={countriesLinks} />

            <CitiesList citiesLinks={citiesLinks} />
        </div>
    )
}

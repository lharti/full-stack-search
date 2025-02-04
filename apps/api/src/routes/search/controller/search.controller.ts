import { ResponseStatusCode } from '@/common/constants'
import { withReqValidation } from '@/libs/withReqValidation'
import { CityModel } from '@/models/city'
import { CountryModel } from '@/models/country'
import { HotelSearchIndexModel } from '@/models/hotelSearchIndex'
import { z } from 'zod'

const searchRequestValidation = {
    query: z.object({
        q: z
            .string()
            .nonempty()
            .toLowerCase()
            .transform(value => value.trim().replace(/\s+/g, ' ')),
    }),
}

export const search = withReqValidation(
    searchRequestValidation,

    async (req, res) => {
        const { q: searchQuery } = req.query

        const hotelsResult =
            await HotelSearchIndexModel.findHotelsMatching(searchQuery)

        const nameMatchingSearchQuery = {
            name: {
                $regex: new RegExp(searchQuery, 'i'),
            },
        }

        const countriesResult = await CountryModel.find(nameMatchingSearchQuery)

        const citiesResult = await CityModel.find(nameMatchingSearchQuery)

        res.status(ResponseStatusCode.OK).json({
            hotels: hotelsResult,
            countries: countriesResult,
            cities: citiesResult,
        })
    },
)

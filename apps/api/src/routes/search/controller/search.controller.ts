import { ResponseStatusCode } from '@/common/constants'
import { withReqValidation } from '@/libs/withReqValidation'
import { CityModel } from '@/models/city'
import { CountryModel } from '@/models/country'
import { HotelModel } from '@/models/hotel'
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

        const queryRegex = new RegExp(searchQuery, 'i')

        const hotelsResult = await HotelModel.find({
            $or: [
                {
                    hotelName: {
                        $regex: queryRegex,
                    },
                },
                {
                    city: {
                        $regex: queryRegex,
                    },
                },
                {
                    country: {
                        $regex: queryRegex,
                    },
                },
                {
                    state: {
                        $regex: queryRegex,
                    },
                },
            ],
        })

        const nameMatchingSearchQuery = {
            name: {
                $regex: queryRegex,
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

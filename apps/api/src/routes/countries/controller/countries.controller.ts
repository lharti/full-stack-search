import { ResponseStatusCode } from '@/common/constants'
import { withReqValidation } from '@/libs/withReqValidation'
import { CountryModel } from '@/models/country'
import { ObjectId } from 'mongodb'
import { z } from 'zod'

const getCountryRequestValidation = {
    params: z.object({
        countryId: z.string().refine(value => ObjectId.isValid(value), {
            message: 'Invalid countryId',
        }),
    }),
}

export const getCountry = withReqValidation(
    getCountryRequestValidation,

    async (req, res) => {
        const { countryId } = req.params

        const country = await CountryModel.findById(countryId)

        if (!country) {
            res.status(ResponseStatusCode.NOT_FOUND).json({
                message: 'Country not found',
            })

            return
        }

        res.status(ResponseStatusCode.OK).json(country)
    },
)

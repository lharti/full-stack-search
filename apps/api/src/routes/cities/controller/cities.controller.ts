import { ResponseStatusCode } from '@/common/constants'
import { withReqValidation } from '@/libs/withReqValidation'
import { CityModel } from '@/models/city'
import { ObjectId } from 'mongodb'
import { z } from 'zod'

const getCityRequestValidation = {
    params: z.object({
        cityId: z.string().refine(value => ObjectId.isValid(value), {
            message: 'Invalid cityId',
        }),
    }),
}

export const getCity = withReqValidation(
    getCityRequestValidation,

    async (req, res) => {
        const { cityId } = req.params

        const city = await CityModel.findById(cityId)

        if (!city) {
            res.status(ResponseStatusCode.NOT_FOUND).json({
                message: 'City not found',
            })

            return
        }

        res.status(ResponseStatusCode.OK).json(city)
    },
)

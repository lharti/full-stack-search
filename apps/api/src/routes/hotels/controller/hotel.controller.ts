import { ResponseStatusCode } from '@/common/constants'
import { withReqValidation } from '@/libs/withReqValidation'
import { HotelModel } from '@/models/hotel'
import { ObjectId } from 'mongodb'
import { z } from 'zod'

const getHotelRequestValidation = {
    params: z.object({
        hotelId: z.string().refine(value => ObjectId.isValid(value), {
            message: 'Invalid hotelId',
        }),
    }),
}

export const getHotel = withReqValidation(
    getHotelRequestValidation,

    async (req, res) => {
        const { hotelId } = req.params

        const hotel = await HotelModel.findById(hotelId)

        if (!hotel) {
            res.status(ResponseStatusCode.NOT_FOUND).json({
                message: 'Hotel not found',
            })

            return
        }

        res.status(ResponseStatusCode.OK).json(hotel)
    },
)

import { ResponseStatusCode } from '@/common/constants'
import { withReqValidation } from '@/libs/withReqValidation'
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
        const { q } = req.query

        const result = await HotelSearchIndexModel.findHotelsMatching(q)

        res.status(ResponseStatusCode.OK).json(result)
    },
)

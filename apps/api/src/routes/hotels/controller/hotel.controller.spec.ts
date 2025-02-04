import { HotelModel } from '@/models/hotel'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { ObjectId } from 'mongodb'
import { getHotel } from './hotel.controller'

jest.mock('@/models/hotel')

const HotelModelMock = jest.mocked(HotelModel)

describe('getHotel', () => {
    it('should find hotel by id', async () => {
        expect.assertions(1)

        const { req, res, next } = setupMocks()

        const hotelId = new ObjectId().toHexString()

        req.params.hotelId = hotelId

        // @ts-expect-error: no need to provide accurate req object
        await getHotel(req, res, next)

        expect(HotelModelMock.findById).toHaveBeenCalledExactlyOnceWith(hotelId)
    })

    it('should return hotel if found', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        const hotelId = new ObjectId().toHexString()

        req.params.hotelId = hotelId

        const hotel = {
            _id: hotelId,
            addressLine1: '8/1 Moo 4 Tumbon Phe Muang',
            addressLine2: '',
            chainName: 'Samed Resorts Group',
            city: 'Koh Samet',
            country: 'Thailand',
            countryIsoCode: 'TH',
            hotelName: 'Sai Kaew Beach Resort',
            starRating: 4,
            state: 'Rayong',
            zipCode: '21160',
        }

        HotelModelMock.findById.mockResolvedValueOnce(hotel)

        // @ts-expect-error: no need to provide accurate req object
        await getHotel(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(200)

        expect(res.json).toHaveBeenCalledExactlyOnceWith(hotel)
    })

    it('should return 404 if hotel not found', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        const hotelId = new ObjectId().toHexString()

        req.params.hotelId = hotelId

        HotelModelMock.findById.mockResolvedValueOnce(null)

        // @ts-expect-error: no need to provide accurate req object
        await getHotel(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(404)

        expect(res.json).toHaveBeenCalledExactlyOnceWith({
            message: 'Hotel not found',
        })
    })

    it('should return 500 if error occurred', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        const hotelId = new ObjectId().toHexString()

        req.params.hotelId = hotelId

        HotelModelMock.findById.mockRejectedValueOnce(
            new Error('Something went wrong'),
        )

        // @ts-expect-error: no need to provide accurate req object
        await getHotel(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(500)

        expect(res.json).toHaveBeenCalledExactlyOnceWith({
            message: 'Internal server error',
        })
    })

    it('should return invalid request error if hotelId is invalid', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        req.params.hotelId = 'invalid-hotel-id'

        // @ts-expect-error: no need to provide accurate req object
        await getHotel(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(400)

        expect(res.json).toHaveBeenCalledExactlyOnceWith([
            {
                params: [
                    {
                        code: 'custom',
                        message: 'Invalid hotelId',
                        path: ['hotelId'],
                    },
                ],
            },
        ])
    })
})

const setupMocks = () => {
    const req = getMockReq()
    const { res, next } = getMockRes()

    console.error = jest.fn()

    return {
        req,
        res,
        next,
    }
}

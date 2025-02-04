import { CityModel } from '@/models/city'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { ObjectId } from 'mongodb'
import { getCity } from './cities.controller'

jest.mock('@/models/city')

const CityModelMock = jest.mocked(CityModel)

describe('getCity', () => {
    it('should find city by id', async () => {
        expect.assertions(1)

        const { req, res, next } = setupMocks()

        const cityId = new ObjectId().toHexString()

        req.params.cityId = cityId

        // @ts-expect-error: no need to provide accurate req object
        await getCity(req, res, next)

        expect(CityModelMock.findById).toHaveBeenCalledExactlyOnceWith(cityId)
    })

    it('should return city if found', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        const cityId = '67a11f7a83c0bfd553c09249'

        req.params.cityId = cityId

        const city = {
            _id: cityId,
            name: 'Auckland',
        }

        CityModelMock.findById.mockResolvedValueOnce(city)

        // @ts-expect-error: no need to provide accurate req object
        await getCity(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(200)

        expect(res.json).toHaveBeenCalledExactlyOnceWith(city)
    })

    it('should return 404 if city not found', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        const cityId = new ObjectId().toHexString()

        req.params.cityId = cityId

        CityModelMock.findById.mockResolvedValueOnce(null)

        // @ts-expect-error: no need to provide accurate req object
        await getCity(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(404)

        expect(res.json).toHaveBeenCalledExactlyOnceWith({
            message: 'City not found',
        })
    })

    it('should return 500 if error occurred', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        const cityId = new ObjectId().toHexString()

        req.params.cityId = cityId

        CityModelMock.findById.mockRejectedValueOnce(
            new Error('Something went wrong'),
        )

        // @ts-expect-error: no need to provide accurate req object
        await getCity(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(500)

        expect(res.json).toHaveBeenCalledExactlyOnceWith({
            message: 'Internal server error',
        })
    })

    it('should return invalid request error if cityId is invalid', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        req.params.cityId = 'invalid-city-id'

        // @ts-expect-error: no need to provide accurate req object
        await getCity(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(400)

        expect(res.json).toHaveBeenCalledExactlyOnceWith([
            {
                params: [
                    {
                        code: 'custom',
                        message: 'Invalid cityId',
                        path: ['cityId'],
                    },
                ],
            },
        ])
    })
})

const setupMocks = () => {
    const req = getMockReq()
    const { res, next } = getMockRes()

    return {
        req,
        res,
        next,
    }
}

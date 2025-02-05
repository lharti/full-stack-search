import { CountryModel } from '@/models/country'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { ObjectId } from 'mongodb'
import { getCountry } from './countries.controller'

jest.mock('@/models/country')

const CountryModelMock = jest.mocked(CountryModel)

describe('getCountry', () => {
    it('should find country by id', async () => {
        expect.assertions(1)

        const { req, res, next } = setupMocks()

        const countryId = new ObjectId().toHexString()

        req.params.countryId = countryId

        // @ts-expect-error: no need to provide accurate req object
        await getCountry(req, res, next)

        expect(CountryModelMock.findById).toHaveBeenCalledExactlyOnceWith(
            countryId,
        )
    })

    it('should return country if found', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        const countryId = '67a11f7a83c0bfd553c09249'

        req.params.countryId = countryId

        const country = {
            _id: countryId,
            name: 'Auckland',
        }

        CountryModelMock.findById.mockResolvedValueOnce(country)

        // @ts-expect-error: no need to provide accurate req object
        await getCountry(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(200)

        expect(res.json).toHaveBeenCalledExactlyOnceWith(country)
    })

    it('should return 404 if country not found', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        const countryId = new ObjectId().toHexString()

        req.params.countryId = countryId

        CountryModelMock.findById.mockResolvedValueOnce(null)

        // @ts-expect-error: no need to provide accurate req object
        await getCountry(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(404)

        expect(res.json).toHaveBeenCalledExactlyOnceWith({
            message: 'Country not found',
        })
    })

    it('should return 500 if error occurred', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        const countryId = new ObjectId().toHexString()

        req.params.countryId = countryId

        CountryModelMock.findById.mockRejectedValueOnce(
            new Error('Something went wrong'),
        )

        // @ts-expect-error: no need to provide accurate req object
        await getCountry(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(500)

        expect(res.json).toHaveBeenCalledExactlyOnceWith({
            message: 'Internal server error',
        })
    })

    it('should return invalid request error if countryId is invalid', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        req.params.countryId = 'invalid-country-id'

        // @ts-expect-error: no need to provide accurate req object
        await getCountry(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(400)

        expect(res.json).toHaveBeenCalledExactlyOnceWith([
            {
                params: [
                    {
                        code: 'custom',
                        message: 'Invalid countryId',
                        path: ['countryId'],
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

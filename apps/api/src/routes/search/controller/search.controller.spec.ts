import { CityModel } from '@/models/city'
import { CountryModel } from '@/models/country'
import { HotelSearchIndexModel } from '@/models/hotelSearchIndex'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { search } from './search.controller'
jest.mock('@/models/hotelSearchIndex')
jest.mock('@/models/city')
jest.mock('@/models/country')

const HotelSearchIndexModelMock = jest.mocked(HotelSearchIndexModel)
const CityModelMock = jest.mocked(CityModel)
const CountryModelMock = jest.mocked(CountryModel)

describe('search', () => {
    it('should find hotels matching search query', async () => {
        expect.assertions(1)

        const { req, res, next } = setupMocks()

        req.query.q = '  searCh  query  '

        // @ts-expect-error: no need to provide accurate req object
        await search(req, res, next)

        expect(
            HotelSearchIndexModelMock.findHotelsMatching,
        ).toHaveBeenCalledExactlyOnceWith('search query')
    })

    it('should find cities with names matching search query', async () => {
        expect.assertions(1)

        const { req, res, next } = setupMocks()

        req.query.q = '  Search   Query  '

        // @ts-expect-error: no need to provide accurate req object
        await search(req, res, next)

        expect(CityModelMock.find).toHaveBeenCalledExactlyOnceWith({
            name: {
                $regex: new RegExp('search query', 'i'),
            },
        })
    })

    it('should find countries with names matching search query', async () => {
        expect.assertions(1)

        const { req, res, next } = setupMocks()

        req.query.q = '  Search   Query  '

        // @ts-expect-error: no need to provide accurate req object
        await search(req, res, next)

        expect(CountryModelMock.find).toHaveBeenCalledExactlyOnceWith({
            name: {
                $regex: new RegExp('search query', 'i'),
            },
        })
    })

    it('should return search results', async () => {
        expect.assertions(2)

        const searchResult = {
            hotels: [
                {
                    hotelId: 'hotelId1',
                    hotelName: 'Hotel Name Onw',
                    matchScore: 3,
                },
                {
                    hotelId: 'hotelId2',
                    hotelName: 'Hotel Name Two',
                    matchScore: 2,
                },
            ],

            cities: [
                {
                    name: 'City Name One',
                },
                {
                    name: 'City Name Two',
                },
            ],

            countries: [
                {
                    name: 'Country Name One',
                },
            ],
        }

        HotelSearchIndexModelMock.findHotelsMatching.mockResolvedValueOnce(
            searchResult.hotels,
        )

        CityModelMock.find.mockResolvedValueOnce(searchResult.cities)

        CountryModelMock.find.mockResolvedValueOnce(searchResult.countries)

        const { req, res, next } = setupMocks()

        req.query.q = 'search query'

        // @ts-expect-error: no need to provide accurate req object
        await search(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(200)

        expect(res.json).toHaveBeenCalledExactlyOnceWith(searchResult)
    })

    it('should return request validation error if request is invalid', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        // @ts-expect-error: no need to provide accurate req object
        await search(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(400)

        expect(res.json).toHaveBeenCalledExactlyOnceWith([
            {
                query: [
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        message: 'Required',
                        path: ['q'],
                        received: 'undefined',
                    },
                ],
            },
        ])
    })

    it('should return 505 if an error occurs', async () => {
        expect.assertions(2)
        const { req, res, next } = setupMocks()

        req.query.q = 'search query'

        HotelSearchIndexModelMock.findHotelsMatching.mockRejectedValueOnce(
            new Error('Something went wrong'),
        )
        // @ts-expect-error: no need to provide accurate req object
        await search(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(500)

        expect(res.json).toHaveBeenCalledExactlyOnceWith({
            message: 'Internal server error',
        })
    })

    it('should transform search query to lowercase and remove extra spaces', async () => {
        expect.assertions(1)

        const { req, res, next } = setupMocks()

        req.query.q = '  searCh  query  '

        // @ts-expect-error: no need to provide accurate req object
        await search(req, res, next)

        expect(req.query.q).toBe('search query')
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

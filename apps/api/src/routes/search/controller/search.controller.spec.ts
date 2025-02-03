import { HotelSearchIndexModel } from '@/models/hotelSearchIndex'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { search } from './search.controller'

jest.mock('@/models/hotelSearchIndex')

const HotelSearchIndexModelMock = jest.mocked(HotelSearchIndexModel)

describe('search', () => {
    it('should be defined', () => {
        expect.assertions(1)

        expect(search).toBeDefined()
    })

    it('should return request validation error if request is invalid', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        // @ts-expect-error: no need to provide accurate req object
        await search(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)

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

    it('should return search results', async () => {
        expect.assertions(2)

        const { req, res, next } = setupMocks()

        req.query.q = 'search query'

        const searchResult = [
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
        ]

        HotelSearchIndexModelMock.findHotelsMatching.mockResolvedValueOnce(
            searchResult,
        )

        // @ts-expect-error: no need to provide accurate req object
        await search(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(200)

        expect(res.json).toHaveBeenCalledExactlyOnceWith(searchResult)
    })

    it('should transform and pass search query to findHotelsMatching', async () => {
        expect.assertions(1)

        const { req, res, next } = setupMocks()

        req.query.q = '  Search   Query  '

        // @ts-expect-error: no need to provide accurate req object
        await search(req, res, next)

        expect(
            HotelSearchIndexModelMock.findHotelsMatching,
        ).toHaveBeenCalledWith('search query')
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

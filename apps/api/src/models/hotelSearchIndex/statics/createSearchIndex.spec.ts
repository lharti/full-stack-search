import { HotelSearchIndexModel } from '@/models/hotelSearchIndex/hotelSearchIndex.model'
import { createSearchIndex } from './createSearchIndex'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const mockingoose = require('mockingoose')

describe('createSearchIndex', () => {
    beforeEach(() => {
        mockingoose.resetAll()
    })

    it('should create a search index for a hotel', async () => {
        expect.assertions(1)

        const result = await createSearchIndex.bind(HotelSearchIndexModel)({
            // @ts-expect-error: no need to provide all fields
            _id: 'hotelId',
            hotelName: 'Marine Hotel',
            country: 'United Kingdom',
            city: 'London',
        })

        expect(result).toMatchObject({
            hotelName: 'Marine Hotel',
            prefixTokens: [
                'm',
                'ma',
                'mar',
                'mari',
                'marin',
                'marine',
                'marine ',
                'marine h',
                'marine ho',
                'marine hot',
                'marine hote',
                'marine hotel',
            ],
            fragmentsTokens: [
                'mar',
                'ari',
                'rin',
                'ine',
                'hot',
                'ote',
                'tel',
                'marine',
                'hotel',
            ],
            semanticTokens: [
                'united kingdom',
                'london',
                'marine',
                'marine hotel',
                'dublin marine',
                'sutton cross',
                'dublin hotel',
                'business hotel',
                'coastal',
            ],
        })
    })

    it('should return city and country in semantic tokens if hotel has no semantic tokens', async () => {
        expect.assertions(1)

        const result = await createSearchIndex.bind(HotelSearchIndexModel)({
            // @ts-expect-error: no need to provide all fields
            _id: 'hotelId',
            hotelName: 'Hotel without semantic tokens',
            country: 'United Kingdom',
            city: 'London',
        })

        expect(result).toMatchObject({
            semanticTokens: ['united kingdom', 'london'],
        })
    })
})

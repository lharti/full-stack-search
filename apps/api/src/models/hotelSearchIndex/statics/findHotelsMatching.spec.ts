import { findHotelsMatching } from './findHotelsMatching'

describe('findHotelsMatching', () => {
    it('should use the right aggregate pipeline to find the matching hotel', async () => {
        expect.assertions(2)
        const hotelSearchIndexModelMock = {
            aggregate: jest.fn(),
        }

        // @ts-expect-error no need to provide
        // a correct hotelSearchIndexMode type
        findHotelsMatching.bind(hotelSearchIndexModelMock)(
            'hilton hotel and spa',
        )

        const usedAggregatePipeline =
            hotelSearchIndexModelMock.aggregate.mock.calls[0][0]

        expect(hotelSearchIndexModelMock.aggregate).toHaveBeenCalledOnce()
        expect(usedAggregatePipeline).toMatchInlineSnapshot(`
            [
              {
                "$match": {
                  "$or": [
                    {
                      "prefixTokens": "hilton hotel and spa",
                    },
                    {
                      "fragmentsTokens": "hilton hotel and spa",
                    },
                    {
                      "semanticTokens": "hilton hotel and spa",
                    },
                  ],
                },
              },
              {
                "$addFields": {
                  "matchScore": {
                    "$switch": {
                      "branches": [
                        {
                          "case": {
                            "$in": [
                              "hilton hotel and spa",
                              "$prefixTokens",
                            ],
                          },
                          "then": 3,
                        },
                        {
                          "case": {
                            "$in": [
                              "hilton hotel and spa",
                              "$fragmentsTokens",
                            ],
                          },
                          "then": 2,
                        },
                        {
                          "case": {
                            "$in": [
                              "hilton hotel and spa",
                              "$semanticTokens",
                            ],
                          },
                          "then": 1,
                        },
                      ],
                      "default": 0,
                    },
                  },
                },
              },
              {
                "$sort": {
                  "hotelName": 1,
                  "matchScore": -1,
                },
              },
              {
                "$project": {
                  "_id": 0,
                  "hotelId": 1,
                  "hotelName": 1,
                  "matchScore": 1,
                },
              },
            ]
        `)
    })

    it('should return the result of the aggregate pipeline', async () => {
        expect.assertions(1)
        const hotelSearchIndexModelMock = {
            aggregate: jest.fn().mockResolvedValue([
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
            ]),
        }

        // @ts-expect-error no need to provide
        // a correct hotelSearchIndexMode type
        const result = await findHotelsMatching.bind(hotelSearchIndexModelMock)(
            'hotel',
        )

        expect(result).toMatchInlineSnapshot(`
            [
              {
                "hotelId": "hotelId1",
                "hotelName": "Hotel Name Onw",
                "matchScore": 3,
              },
              {
                "hotelId": "hotelId2",
                "hotelName": "Hotel Name Two",
                "matchScore": 2,
              },
            ]
        `)
    })
})

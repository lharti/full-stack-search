import { HotelSearchIndexModel } from './hotelSearchIndex.model'
import { createSearchIndex } from './statics/createSearchIndex'
import { findHotelsMatching } from './statics/findHotelsMatching'

describe('HotelSearchIndexModel', () => {
    it('should have the right collection name', () => {
        expect.assertions(1)

        expect(HotelSearchIndexModel.collection.name).toBe('hotelsearchindexes')
    })

    it('should have the right static methods', () => {
        expect.assertions(2)

        expect(HotelSearchIndexModel.findHotelsMatching).toBe(
            findHotelsMatching,
        )

        expect(HotelSearchIndexModel.createSearchIndex).toBe(createSearchIndex)
    })

    it('should have the right schema object', () => {
        expect.assertions(1)

        expect(HotelSearchIndexModel.schema.obj).toMatchInlineSnapshot(`
                            {
                              "fragmentsTokens": {
                                "index": true,
                                "required": false,
                                "type": [
                                  {
                                    "type": [Function],
                                  },
                                ],
                              },
                              "hotelId": {
                                "required": true,
                                "type": [Function],
                              },
                              "hotelName": {
                                "required": true,
                                "type": [Function],
                              },
                              "prefixTokens": {
                                "index": true,
                                "required": false,
                                "type": [
                                  {
                                    "type": [Function],
                                  },
                                ],
                              },
                              "semanticTokens": {
                                "index": true,
                                "required": false,
                                "type": [
                                  {
                                    "type": [Function],
                                  },
                                ],
                              },
                            }
                    `)
    })

    it('should have the right schema options', () => {
        expect.assertions(1)

        // @ts-expect-error: options exists but not defined in types by mongoose
        expect(HotelSearchIndexModel.schema.options).toMatchInlineSnapshot(`
                            {
                              "_id": true,
                              "autoIndex": null,
                              "bufferCommands": true,
                              "capped": false,
                              "discriminatorKey": "__t",
                              "id": true,
                              "minimize": true,
                              "optimisticConcurrency": false,
                              "pluralization": true,
                              "read": null,
                              "shardKey": null,
                              "strict": true,
                              "strictQuery": false,
                              "typeKey": "type",
                              "validateBeforeSave": true,
                              "validateModifiedOnly": false,
                              "versionKey": "__v",
                            }
                    `)
    })

    it('should have the right schema', () => {
        expect.assertions(1)

        expect(HotelSearchIndexModel.schema).toMatchSnapshot()
    })
})

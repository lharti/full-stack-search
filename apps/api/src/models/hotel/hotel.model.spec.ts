import { HotelModel } from '@/models/hotel'

describe('HotelModel', () => {
    it('should have the right collection name', () => {
        expect.assertions(1)

        expect(HotelModel.collection.name).toBe('hotels')
    })

    it('should have the right schema object', () => {
        expect.assertions(1)

        expect(HotelModel.schema.obj).toMatchInlineSnapshot(`
            {
              "addressLine1": {
                "required": true,
                "type": [Function],
              },
              "addressLine2": {
                "type": [Function],
              },
              "chainName": {
                "type": [Function],
              },
              "city": {
                "required": true,
                "type": [Function],
              },
              "country": {
                "required": true,
                "type": [Function],
              },
              "countryIsoCode": {
                "maxlength": 3,
                "minlength": 2,
                "required": true,
                "type": [Function],
                "uppercase": true,
              },
              "hotelName": {
                "index": true,
                "required": true,
                "type": [Function],
              },
              "starRating": {
                "max": 5,
                "min": 1,
                "required": true,
                "type": [Function],
              },
              "state": {
                "type": [Function],
              },
              "zipCode": {
                "type": [Function],
              },
            }
        `)
    })

    it('should have the right schema options', async () => {
        expect.assertions(1)

        // @ts-expect-error: options exists
        expect(HotelModel.schema.options).toMatchInlineSnapshot(`
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

        expect(HotelModel.schema).toMatchSnapshot('HotelSchema')
    })
})

import { CityModel } from './city.model'

describe('CityModel', () => {
    it('should have the right collection name', () => {
        expect.assertions(1)

        expect(CityModel.collection.name).toBe('cities')
    })

    it('should have the right schema object', () => {
        expect.assertions(1)

        expect(CityModel.schema.obj).toMatchInlineSnapshot(`
            {
              "name": {
                "index": true,
                "required": true,
                "type": [Function],
              },
            }
        `)
    })

    it('should have the right schema options', () => {
        expect.assertions(1)

        // @ts-expect-error: options exists
        expect(CityModel.schema.options).toMatchInlineSnapshot(`
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

        expect(CityModel.schema).toMatchSnapshot('CitySchema')
    })
})

import { z } from 'zod'
import { validateRequest } from './validateRequest'

describe('validateRequest', () => {
    it('should return parsed request if there are no validation errors', () => {
        expect.assertions(2)

        const reqSchema = {
            body: z.object({
                name: z.string().toLowerCase().nonempty(),
            }),
        }

        const req = {
            body: {
                name: 'JOHN',
            },
        }

        // @ts-expect-error: no need for a real req object
        const [parsedReq, errors] = validateRequest(req, reqSchema)

        expect(parsedReq).toMatchInlineSnapshot(`
            {
              "body": {
                "name": "john",
              },
            }
        `)

        expect(errors).toBeUndefined()
    })

    it('should return validation errors if there are any', () => {
        expect.assertions(2)

        const reqSchema = {
            body: z.object({
                name: z.string().toLowerCase().nonempty(),
            }),
        }

        const req = {
            body: {
                name: '',
            },
        }

        // @ts-expect-error: no need for a real req object
        const [parsedReq, errors] = validateRequest(req, reqSchema)

        expect(parsedReq).toMatchInlineSnapshot(`
            {
              "body": {
                "name": "",
              },
            }
        `)

        expect(errors).toMatchInlineSnapshot(`
            [
              {
                "body": [
                  {
                    "code": "too_small",
                    "exact": false,
                    "inclusive": true,
                    "message": "String must contain at least 1 character(s)",
                    "minimum": 1,
                    "path": [
                      "name",
                    ],
                    "type": "string",
                  },
                ],
              },
            ]
        `)
    })

    it('should return validation errors for multiple request items', () => {
        expect.assertions(2)

        const reqSchema = {
            body: z.object({
                name: z.string().toLowerCase().nonempty(),
            }),

            query: z.object({
                page: z.number().int(),
            }),

            params: z.object({
                id: z.string().uuid(),
            }),

            headers: z.object({
                authorization: z.string().nonempty(),
            }),
        }

        const req = {
            headers: {
                authorization: '',
            },
        }

        // @ts-expect-error: no need for a real req object
        const [parsedReq, errors] = validateRequest(req, reqSchema)

        expect(parsedReq).toMatchInlineSnapshot(`
            {
              "headers": {
                "authorization": "",
              },
            }
        `)

        expect(errors).toMatchInlineSnapshot(`
            [
              {
                "body": [
                  {
                    "code": "invalid_type",
                    "expected": "object",
                    "message": "Required",
                    "path": [],
                    "received": "undefined",
                  },
                ],
              },
              {
                "query": [
                  {
                    "code": "invalid_type",
                    "expected": "object",
                    "message": "Required",
                    "path": [],
                    "received": "undefined",
                  },
                ],
              },
              {
                "params": [
                  {
                    "code": "invalid_type",
                    "expected": "object",
                    "message": "Required",
                    "path": [],
                    "received": "undefined",
                  },
                ],
              },
              {
                "headers": [
                  {
                    "code": "too_small",
                    "exact": false,
                    "inclusive": true,
                    "message": "String must contain at least 1 character(s)",
                    "minimum": 1,
                    "path": [
                      "authorization",
                    ],
                    "type": "string",
                  },
                ],
              },
            ]
        `)
    })
})

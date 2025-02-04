import { ValidationError } from '@/libs/withReqValidation/withReqValidation.types'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { z } from 'zod'
import { validateRequest } from './validateRequest'
import { withReqValidation } from './withReqValidation'

jest.mock('./validateRequest', () => ({
    validateRequest: jest.fn().mockReturnValue([{}, undefined]),
}))

const validateRequestMock = jest.mocked(validateRequest)

describe('withReqValidation', () => {
    it('should use validateRequest', () => {
        expect.assertions(1)

        const { reqSchema, req, res, next } = setupMocks()

        const handlerWithValidation = withReqValidation(reqSchema, () => {})

        // @ts-expect-error: just a mock, no need to be accurate
        handlerWithValidation(req, res, next)

        expect(validateRequestMock).toHaveBeenCalledExactlyOnceWith(
            req,
            reqSchema,
        )
    })

    it('should return 400 with validation errors if request is invalid', () => {
        expect.assertions(2)

        const { reqSchema, req, res, next } = setupMocks()

        const handlerWithValidation = withReqValidation(reqSchema, () => {})

        const validationErrors: ValidationError[] = [
            {
                query: [
                    {
                        code: 'invalid_type',
                        expected: 'string',
                        message: 'Required',
                        path: ['name'],
                        received: 'undefined',
                    },
                ],
            },
        ]

        // @ts-expect-error: just a mock, no need to be accurate
        validateRequestMock.mockReturnValue([req, validationErrors])

        // @ts-expect-error: just a mock, no need to be accurate
        handlerWithValidation(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(400)
        expect(res.json).toHaveBeenCalledExactlyOnceWith(validationErrors)
    })

    it('should call the handler if request is valid', () => {
        expect.assertions(1)

        const { reqSchema, req, res, next } = setupMocks()

        const handler = jest.fn()

        const handlerWithValidation = withReqValidation(reqSchema, handler)

        const parsedReq = {
            query: {
                name: 'John Doe',
            },
        }
        // @ts-expect-error: just a mock, no need to be accurate
        validateRequestMock.mockReturnValue([parsedReq, undefined])

        // @ts-expect-error: just a mock, no need to be accurate
        handlerWithValidation(req, res, next)

        expect(handler).toHaveBeenCalledExactlyOnceWith(parsedReq, res, next)
    })

    it('should return 505 response if handler throws an error', async () => {
        expect.assertions(2)

        const { reqSchema, req, res, next } = setupMocks()

        const handler = jest
            .fn()
            .mockRejectedValueOnce(new Error('Something went wrong'))

        const handlerWithValidation = withReqValidation(reqSchema, handler)

        // @ts-expect-error: just a mock, no need to be accurate
        validateRequestMock.mockReturnValue([{}, undefined])

        // @ts-expect-error: just a mock, no need to be accurate
        await handlerWithValidation(req, res, next)

        expect(res.status).toHaveBeenCalledExactlyOnceWith(500)

        expect(res.json).toHaveBeenCalledExactlyOnceWith({
            message: 'Internal server error',
        })
    })
})

const setupMocks = () => {
    const reqSchema = {
        query: z.object({
            name: z.string().nonempty(),
        }),
    }

    const req = getMockReq()
    const { res, next } = getMockRes()

    return {
        reqSchema,
        req,
        res,
        next,
    }
}

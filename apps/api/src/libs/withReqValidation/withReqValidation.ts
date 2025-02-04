import { ResponseStatusCode } from '@/common/constants'
import { Handler, NextFunction, Request, Response } from 'express'
import { validateRequest } from './validateRequest'
import {
    RequestHandler,
    RequestValidationSchema,
} from './withReqValidation.types'

/**
 * Higher order function that adds request validation to a request handler
 *
 * @param reqSchema - The validation schema for the request
 * @param handler - The request handler
 * @returns The request handler with validation
 */
export const withReqValidation = <
    RequestSchema extends RequestValidationSchema,
>(
    reqSchema: RequestSchema,
    handler: RequestHandler<RequestSchema>,
): Handler => {
    const handlerWithValidation = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        const [parsedReq, errors] = validateRequest(req, reqSchema)

        if (errors) {
            res.status(ResponseStatusCode.BAD_REQUEST).json(errors)

            return
        }

        try {
            return await handler(parsedReq, res, next)
        } catch (error) {
            console.error(error)

            res.status(ResponseStatusCode.INTERNAL_SERVER_ERROR).json({
                message: 'Internal server error',
            })
        }
    }

    return handlerWithValidation
}

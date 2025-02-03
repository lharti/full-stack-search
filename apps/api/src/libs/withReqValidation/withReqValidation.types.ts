import { NextFunction, Request, Response } from 'express'
import { z, ZodIssue, ZodSchema } from 'zod'

export type RequestSchemaItemKey = 'body' | 'query' | 'params' | 'headers'

export type RequestValidationSchema = Partial<
    Record<RequestSchemaItemKey, ZodSchema>
>

export type RequestSchemaEntries = [RequestSchemaItemKey, ZodSchema][]

export type ValidationError = Partial<Record<RequestSchemaItemKey, ZodIssue[]>>

export type ValidateRequestResult = [Request, ValidationError[] | undefined]

// Request handler start
export type RequestHandler<RequestSchema extends RequestValidationSchema> = (
    req: InferRequestFromSchema<RequestSchema>,
    res: Response,
    next: NextFunction,
) => void

export type InferRequestFromSchema<
    RequestSchema extends RequestValidationSchema,
> = Request<
    z.infer<NonNullable<RequestSchema['params']>>,
    unknown,
    z.infer<NonNullable<RequestSchema['body']>>,
    z.infer<NonNullable<RequestSchema['query']>>,
    z.infer<NonNullable<RequestSchema['headers']>>
>
// Request handler end

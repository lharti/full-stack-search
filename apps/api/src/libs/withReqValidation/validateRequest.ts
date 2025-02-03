import { Request } from 'express'
import {
    RequestSchemaEntries,
    RequestValidationSchema,
    ValidateRequestResult,
    ValidationError,
} from './withReqValidation.types'

export const validateRequest = (
    req: Request,
    reqSchema: RequestValidationSchema,
): ValidateRequestResult => {
    const reqSchemaEntries = Object.entries(reqSchema) as RequestSchemaEntries

    const validationErrors: ValidationError[] = []

    for (const [reqItemKey, zodSchema] of reqSchemaEntries) {
        const { success, error, data } = zodSchema.safeParse(req[reqItemKey])

        if (!success) {
            validationErrors.push({
                [reqItemKey]: error.issues,
            })
        } else {
            req[reqItemKey] = data
        }
    }

    if (validationErrors.length) {
        return [req, validationErrors]
    }

    return [req, undefined]
}

import { Router } from 'express'
import { getCountry } from './controller'

const countriesRouter = Router()

countriesRouter.get('/:countryId', getCountry)

export { countriesRouter }

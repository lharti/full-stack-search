import { Router } from 'express'
import { getCity } from './controller'

const citiesRouter = Router()

citiesRouter.get('/:cityId', getCity)

export { citiesRouter }

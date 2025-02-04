import { Router } from 'express'
import { getHotel } from './controller'

const hotelsRouter = Router()

hotelsRouter.get('/:hotelId', getHotel)

export { hotelsRouter }

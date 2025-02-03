import { Router } from 'express'
import { search } from './controller/search.controller'

const searchRouter = Router()

searchRouter.get('/', search)

export { searchRouter }

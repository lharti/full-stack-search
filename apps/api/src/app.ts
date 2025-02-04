import { citiesRouter } from '@/routes/cities'
import { countriesRouter } from '@/routes/countries'
import { hotelsRouter } from '@/routes/hotels'
import { searchRouter } from '@/routes/search'
import cors from 'cors'
import express from 'express'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/search', searchRouter)
app.use('/hotels', hotelsRouter)
app.use('/cities', citiesRouter)
app.use('/countries', countriesRouter)

export { app }

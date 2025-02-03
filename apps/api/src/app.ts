import { searchRouter } from '@/routes/search'
import cors from 'cors'
import express from 'express'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/search', searchRouter)

export { app }

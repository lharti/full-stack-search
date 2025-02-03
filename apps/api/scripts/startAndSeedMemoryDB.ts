import { connectToDatabase } from '@/common/db/connectToDatabase'
import { HotelModel } from '@/models/hotel/hotel.model'
import { hotels } from './seeds/hotels'

export const startAndSeedMemoryDB = async () => {
    if (!process.env.DATABASE_URI) {
        throw new Error('MONGO_URI is not defined')
    }

    const dbConnection = await connectToDatabase(process.env.DATABASE_URI)

    for (const hotel of hotels) {
        await HotelModel.create(hotel)
    }

    process.on('SIGTERM', async () => {
        await dbConnection.close()
        process.exit(0)
    })
}

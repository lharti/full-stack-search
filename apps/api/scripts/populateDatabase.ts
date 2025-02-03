import { connectToDatabase } from '@/common/db/connectToDatabase'
import { CityModel } from '@/models/city'
import { CountryModel } from '@/models/country'
import { HotelModel } from '@/models/hotel'
import { cities } from 'scripts/seeds/cities'
import { countries } from 'scripts/seeds/countries'
import { hotels } from './seeds/hotels'

export const populateDatabase = async () => {
    if (!process.env.DATABASE_URI) {
        throw new Error('DATABASE_URI is not defined')
    }

    const dbConnection = await connectToDatabase(process.env.DATABASE_URI)

    await HotelModel.bulkSave(hotels.map(hotel => new HotelModel(hotel)))

    await CityModel.insertMany(cities)

    await CountryModel.insertMany(countries)

    console.log('Database seeded')

    process.on('SIGTERM', async () => {
        await dbConnection.close()
        process.exit(0)
    })
}

populateDatabase()

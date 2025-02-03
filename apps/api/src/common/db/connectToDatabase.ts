import mongoose, { Connection } from 'mongoose'

export const connectToDatabase = async (uri: string): Promise<Connection> => {
    mongoose.connection.on('error', error => {
        throw new Error(`Error connecting to MongoDB: ${error.message}`)
    })

    await mongoose.connect(uri)

    return mongoose.connection
}

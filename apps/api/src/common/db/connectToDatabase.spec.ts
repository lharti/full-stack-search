import { connectToDatabase } from '@/common/db/connectToDatabase'
import mongoose from 'mongoose'

jest.mock('mongoose', () => {
    return {
        connect: jest.fn(() => Promise.resolve()),

        connection: {
            on: jest.fn(),
        },
    }
})

describe('connectToDatabase', () => {
    it('should connect to database', async () => {
        expect.assertions(1)

        const uri = 'mongodb://localhost:27017/test'

        await connectToDatabase(uri)

        expect(mongoose.connect).toHaveBeenCalledExactlyOnceWith(uri)
    })

    it('should return the connection object', async () => {
        expect.assertions(1)

        const connection = await connectToDatabase(
            'mongodb://localhost:27017/test',
        )

        expect(connection).toBe(mongoose.connection)
    })

    it('should throw an error if mongoose.connect() fails', async () => {
        expect.assertions(1)

        const mongooseConnectMock = mongoose.connect as jest.Mock

        mongooseConnectMock.mockRejectedValueOnce(
            new Error('connection failed'),
        )

        expect(
            connectToDatabase('mongodb://localhost:27017/test'),
        ).rejects.toThrowErrorMatchingInlineSnapshot(`"connection failed"`)
    })

    it('should setup connection error listener', async () => {
        expect.assertions(2)

        connectToDatabase('mongodb://wrong-uri')

        const connectionListenerMock = mongoose.connection.on as jest.Mock

        const connectionErrorEventCallback =
            connectionListenerMock.mock.calls[0][1]

        expect(connectionListenerMock).toHaveBeenCalledExactlyOnceWith(
            'error',
            expect.any(Function),
        )

        expect(() =>
            connectionErrorEventCallback(new Error('auth failed')),
        ).toThrowErrorMatchingInlineSnapshot(
            `"Error connecting to MongoDB: auth failed"`,
        )
    })
})

import { app } from '@/app'
import { connectToDatabase } from '@/common/db'
import * as dotenv from 'dotenv'

dotenv.config()

export const startServer = async () => {
    if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI is not set')

    const dbConnection = await connectToDatabase(process.env.DATABASE_URI)

    const PORT = process.env.PORT || 5000

    app.listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`)
    })

    process.on('SIGTERM', async () => {
        await dbConnection.close()
        process.exit(0)
    })
}

startServer().catch(() => {
    process.exit(1)
})

import { app } from '@/app'
import { searchRouter } from '@/routes/search'
import cors from 'cors'
import express from 'express'

// Mocks start
jest.mock('express', () => {
    const express = () => ({
        use: jest.fn(),
    })

    const jsonMiddleware = () => {}
    express.json = () => jsonMiddleware

    return {
        __esModule: true,
        ...jest.requireActual('express'),
        default: express,
    }
})

jest.mock('cors', () => {
    const corsMiddleware = () => {}

    return () => corsMiddleware
})

jest.mock('@/routes/search', () => ({
    searchRouter: function searchRouter() {},
}))

jest.mock('@/routes/hotels', () => ({
    hotelsRouter: function hotelsRouter() {},
}))

jest.mock('@/routes/cities', () => ({
    citiesRouter: function citiesRouter() {},
}))
// Mocks end

describe('app', () => {
    it('should be defined', () => {
        expect.assertions(1)

        expect(app).toBeDefined()
    })

    it('should use cors middleware', () => {
        expect.assertions(1)

        jest.isolateModulesAsync(async () => {
            const { app } = await import('@/app')

            expect(app.use).toHaveBeenNthCalledWith(1, cors())
        })
    })

    it('should use json middleware', () => {
        expect.assertions(1)

        jest.isolateModulesAsync(async () => {
            const { app } = await import('@/app')

            expect(app.use).toHaveBeenNthCalledWith(2, express.json())
        })
    })

    it('should mount search router', () => {
        expect.assertions(1)

        jest.isolateModulesAsync(async () => {
            const { app } = await import('@/app')

            expect(app.use).toHaveBeenCalledWith('/search', searchRouter)
        })
    })

    it('should mount hotels router', () => {
        expect.assertions(1)

        jest.isolateModulesAsync(async () => {
            const { app } = await import('@/app')
            const { hotelsRouter } = await import('@/routes/hotels')

            expect(app.use).toHaveBeenCalledWith('/hotels', hotelsRouter)
        })
    })

    it('should mount cities router', () => {
        expect.assertions(1)

        jest.isolateModulesAsync(async () => {
            const { app } = await import('@/app')
            const { citiesRouter } = await import('@/routes/cities')

            expect(app.use).toHaveBeenCalledWith('/cities', citiesRouter)
        })
    })
})

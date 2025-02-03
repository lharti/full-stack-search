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
    searchRouter: jest.fn(),
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
})

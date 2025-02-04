import { hotelsRouter } from './hotels.router'

jest.mock('express', () => ({
    Router: () => ({
        get: jest.fn(),
    }),
}))

describe('hotelsRouter', () => {
    it('should be defined', () => {
        expect.assertions(1)

        expect(hotelsRouter).toBeDefined()
    })

    it('should setup get hotel endpoint', () => {
        expect.assertions(1)

        jest.isolateModulesAsync(async () => {
            const { getHotel } = await import('./controller')
            const { hotelsRouter } = await import('./hotels.router')

            expect(hotelsRouter.get).toHaveBeenCalledWith('/:hotelId', getHotel)
        })
    })
})

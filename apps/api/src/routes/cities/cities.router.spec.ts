import { citiesRouter } from './cities.router'

jest.mock('express', () => ({
    Router: () => ({
        get: jest.fn(),
    }),
}))

describe('citiesRouter', () => {
    it('should be defined', () => {
        expect.assertions(1)

        expect(citiesRouter).toBeDefined()
    })

    it('should setup get city endpoint', () => {
        expect.assertions(1)

        jest.isolateModulesAsync(async () => {
            const { getCity } = await import('./controller')
            const { citiesRouter } = await import('./cities.router')

            expect(citiesRouter.get).toHaveBeenCalledWith('/:cityId', getCity)
        })
    })
})

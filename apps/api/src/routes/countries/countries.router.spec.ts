import { countriesRouter } from './countries.router'

jest.mock('express', () => ({
    Router: () => ({
        get: jest.fn(),
    }),
}))

describe('countriesRouter', () => {
    it('should be defined', () => {
        expect.assertions(1)

        expect(countriesRouter).toBeDefined()
    })

    it('should setup get country endpoint', () => {
        expect.assertions(1)

        jest.isolateModulesAsync(async () => {
            const { getCountry } = await import('./controller')
            const { countriesRouter } = await import('./countries.router')

            expect(countriesRouter.get).toHaveBeenCalledWith(
                '/:countryId',
                getCountry,
            )
        })
    })
})

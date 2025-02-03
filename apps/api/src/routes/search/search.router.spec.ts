import { searchRouter } from '@/routes/search/search.router'

jest.mock('express', () => ({
    Router: () => ({
        get: jest.fn(),
    }),
}))

describe('searchRouter', () => {
    it('should be defined', () => {
        expect.assertions(1)

        expect(searchRouter).toBeDefined()
    })

    it('should setup root endpoint', () => {
        expect.assertions(1)

        jest.isolateModulesAsync(async () => {
            const { search } = await import('./controller/search.controller')
            const { searchRouter } = await import('./search.router')

            expect(searchRouter.get).toHaveBeenCalledWith('/', search)
        })
    })
})

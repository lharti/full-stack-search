import { render } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { Route } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { AppRouter } from './router'

vi.mock('react-router', () => ({
    BrowserRouter: ({ children }: PropsWithChildren) => children,
    Routes: ({ children }: PropsWithChildren) => children,
    Route: vi.fn(),
}))

const RouteMock = vi.mocked(Route)

describe('<AppRouter />', () => {
    it('should setup routes', () => {
        expect.assertions(1)

        render(<AppRouter />)

        const routes = RouteMock.mock.calls?.map(([route]) => route)

        expect(routes).toMatchInlineSnapshot(`
          [
            {
              "element": <HomePage />,
              "path": "/",
            },
            {
              "element": <HotelPage />,
              "path": "/hotels/:hotelId",
            },
            {
              "element": <CityPage />,
              "path": "/cities/:cityId",
            },
          ]
        `)
    })
})

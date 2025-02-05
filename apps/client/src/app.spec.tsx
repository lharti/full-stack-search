import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { App } from './app'

vi.mock('@tanstack/react-query')

vi.mock('./router', () => ({
    AppRouter: () => 'APP_ROUTER',
}))

const QueryClientProviderMock = vi.mocked(QueryClientProvider)

describe('<App />', () => {
    it('should set up the QueryClientProvider', () => {
        expect.assertions(1)

        render(<App />)

        expect(QueryClientProviderMock).toHaveBeenCalledWith(
            {
                children: expect.anything(),
                client: expect.any(QueryClient),
            },

            undefined,
        )
    })

    it('should render the AppRouter', () => {
        expect.assertions(1)

        QueryClientProviderMock.mockImplementation(
            ({ children }: PropsWithChildren) => {
                return <>{children}</>
            },
        )
        const { container } = render(<App />)

        expect(container).toMatchInlineSnapshot(`
          <div>
            APP_ROUTER
          </div>
        `)
    })
})

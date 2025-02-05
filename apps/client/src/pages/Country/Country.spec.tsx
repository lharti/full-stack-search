import { useGetCountryQuery } from '@/hooks/useGetCountryQuery'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { CountryPage } from './Country.page'

vi.mock('@/hooks/useGetCountryQuery', () => ({
    useGetCountryQuery: vi.fn(() => ({
        data: {
            name: 'Country 1',
            isoCode: 'C1',
        },
        isSuccess: false,
    })),
}))

const useGetCountryQueryMock = vi.mocked(useGetCountryQuery)

describe('CountryPage', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(
            <BrowserRouter>
                <CountryPage />
            </BrowserRouter>,
        )

        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="card text-center container w-70 mt-5"
            >
              <div
                class="card-body"
              >
                <h1
                  class="card-title"
                >
                  Country 1
                </h1>
                <p
                  class="card-text"
                >
                  C1
                </p>
                <a
                  class="btn btn-primary"
                  data-discover="true"
                  href="/"
                >
                  Go back
                </a>
              </div>
            </div>
          </div>
        `)
    })

    it('should render not found card if country is not found', () => {
        expect.assertions(1)

        useGetCountryQueryMock.mockReturnValueOnce(
            // @ts-expect-error: no need to provide all properties
            {
                data: undefined,
                isSuccess: false,
                isError: true,
            },
        )

        const { container } = render(
            <BrowserRouter>
                <CountryPage />
            </BrowserRouter>,
        )

        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="d-flex vh-100 justify-content-center align-items-center"
            >
              <div
                class="card text-center p-4 shadow"
                style="max-width: 400px;"
              >
                <div
                  class="card-body"
                >
                  <h1
                    class="display-4"
                  >
                    404
                  </h1>
                  <p
                    class="lead"
                  >
                    Page Not Found
                  </p>
                  <a
                    class="btn btn-primary"
                    data-discover="true"
                    href="/"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        `)
    })

    it('should render loading message while fetching country', () => {
        expect.assertions(1)

        useGetCountryQueryMock.mockReturnValueOnce(
            // @ts-expect-error: no need to provide all properties
            {
                data: undefined,
            },
        )

        const { container } = render(
            <BrowserRouter>
                <CountryPage />
            </BrowserRouter>,
        )

        expect(container).toMatchInlineSnapshot(`
          <div>
            <p>
              Loading...
            </p>
          </div>
        `)
    })
})

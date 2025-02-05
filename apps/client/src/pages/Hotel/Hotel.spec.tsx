import { useGetHotelQuery } from '@/hooks/useGetHotelQuery'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { HotelPage } from './Hotel.page'

vi.mock('@/hooks/useGetHotelQuery', () => ({
    useGetHotelQuery: vi.fn(() => ({
        data: {
            hotelId: '1',
            hotelName: 'Hotel 1',
            city: 'City 1',
            country: 'Country 1',
            addressLine1: 'Address 1',
            addressLine2: 'Address 2',
            zipCode: 'Zip code',
            starRating: 5,
        },
        isSuccess: false,
    })),
}))

const useGetHotelQueryMock = vi.mocked(useGetHotelQuery)

describe('HotelsPage', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(
            <BrowserRouter>
                <HotelPage />
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
                  Hotel 1
                </h1>
                <h2 />
                <p
                  class="card-text"
                >
                  City: 
                  City 1
                </p>
                <p
                  class="card-text"
                >
                  Country: 
                  Country 1
                </p>
                <p
                  class="card-text"
                >
                  Address 1: 
                  Address 1
                </p>
                <p
                  class="card-text"
                >
                  Address 2: 
                  Address 2
                </p>
                <p
                  class="card-text"
                >
                  Zip code: 
                  Zip code
                </p>
                <p
                  class="card-text"
                >
                  Star rating: 
                  5
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

        useGetHotelQueryMock.mockReturnValueOnce(
            // @ts-expect-error: no need to provide all properties
            {
                data: undefined,
                isSuccess: false,
                isError: true,
            },
        )

        const { container } = render(
            <BrowserRouter>
                <HotelPage />
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

        useGetHotelQueryMock.mockReturnValueOnce(
            // @ts-expect-error: no need to provide all properties
            {
                data: undefined,
            },
        )

        const { container } = render(
            <BrowserRouter>
                <HotelPage />
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

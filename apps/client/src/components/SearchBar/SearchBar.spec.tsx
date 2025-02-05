import { useSearchQuery } from '@/hooks/useSearchQuery'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { SearchBar } from './SearchBar'

vi.mock('@/hooks/useSearchQuery', () => ({
    useSearchQuery: vi.fn(() => ({
        data: {},
        isSuccess: false,
    })),
}))

const useSearchQueryMock = vi.mocked(useSearchQuery)

describe('SearchBar', () => {
    it('should render search bar', () => {
        expect.assertions(1)

        const { container } = render(<SearchBar />)

        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="form position-relative"
            >
              <i
                class="fa fa-search"
              />
              <input
                aria-label="Search accommodations..."
                class="form-control form-input"
                placeholder="Search accommodations..."
                role="search"
                type="text"
                value=""
              />
            </div>
          </div>
        `)
    })

    it('should render search bar result if search is successful', () => {
        expect.assertions(1)

        const searchResult = {
            cities: [
                {
                    _id: '1',
                    name: 'City 1',
                },
            ],
            hotels: [],
            countries: [],
        }

        useSearchQueryMock.mockReturnValueOnce(
            // @ts-expect-error: no need to provide all properties
            {
                data: searchResult,

                isSuccess: true,
            },
        )

        const { container } = render(
            <BrowserRouter>
                <SearchBar />
            </BrowserRouter>,
        )

        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="form position-relative"
            >
              <i
                class="fa fa-search"
              />
              <input
                aria-label="Search accommodations..."
                class="form-control form-input"
                placeholder="Search accommodations..."
                role="search"
                type="text"
                value=""
              />
            </div>
            <div
              class="dropdown"
            >
              <menu
                class="dropdown-menu show w-100"
              >
                <div
                  class="p-2"
                >
                  <h2>
                    Hotels
                  </h2>
                  <p>
                    No hotels matched
                  </p>
                  <h2>
                    Countries
                  </h2>
                  <p>
                    No countries matched
                  </p>
                  <h2>
                    Cities
                  </h2>
                  <li>
                    <a
                      class="dropdown-item"
                      data-discover="true"
                      href="/cities/1"
                    >
                      <i
                        class="fa fa-map-marker mr-2"
                      />
                      City 1
                    </a>
                    <hr
                      class="divider"
                    />
                  </li>
                </div>
              </menu>
            </div>
          </div>
        `)
    })

    it('should sync search input with search query', async () => {
        expect.assertions(1)

        const user = userEvent.setup()

        const { getByRole } = render(<SearchBar />)

        const input = getByRole('search')

        await user.type(input, 'Hote')

        expect(useSearchQueryMock.mock.calls).toMatchInlineSnapshot(`
          [
            [
              "",
            ],
            [
              "H",
            ],
            [
              "Ho",
            ],
            [
              "Hot",
            ],
            [
              "Hote",
            ],
          ]
        `)
    })

    it('should show clear input button when input is not empty', async () => {
        expect.assertions(1)

        const user = userEvent.setup()

        const { getByRole, container } = render(<SearchBar />)

        const input = getByRole('search')

        await user.type(input, 'Hote')

        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="form position-relative"
            >
              <i
                class="fa fa-search"
              />
              <input
                aria-label="Search accommodations..."
                class="form-control form-input"
                placeholder="Search accommodations..."
                role="search"
                type="text"
                value="Hote"
              />
              <span
                aria-label="Clear search field"
                class="clear-search-button"
                role="button"
              >
                <i
                  class="fa fa-close clear-search-button-icon"
                />
              </span>
            </div>
          </div>
        `)
    })

    it('should clear input when clear input button is clicked', async () => {
        expect.assertions(1)

        const user = userEvent.setup()

        const { getByRole, container } = render(<SearchBar />)

        const input = getByRole('search')

        await user.type(input, 'Hote')

        const clearInputButton = getByRole('button')

        await user.click(clearInputButton)

        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="form position-relative"
            >
              <i
                class="fa fa-search"
              />
              <input
                aria-label="Search accommodations..."
                class="form-control form-input"
                placeholder="Search accommodations..."
                role="search"
                type="text"
                value=""
              />
            </div>
          </div>
        `)
    })
})

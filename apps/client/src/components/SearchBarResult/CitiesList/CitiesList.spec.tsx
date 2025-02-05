import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { CitiesList } from './CitiesList'

describe('CitiesList', () => {
    it('should render cities list', () => {
        expect.assertions(1)

        const citiesLinks = [
            {
                id: '1',

                path: '/cities/1',
                title: 'City 1',
            },
            {
                id: '2',

                path: '/cities/2',
                title: 'City 2',
            },
        ]

        const { container } = render(
            <BrowserRouter>
                <CitiesList citiesLinks={citiesLinks} />,
            </BrowserRouter>,
        )

        expect(container).toMatchInlineSnapshot(`
          <div>
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
            <li>
              <a
                class="dropdown-item"
                data-discover="true"
                href="/cities/2"
              >
                <i
                  class="fa fa-map-marker mr-2"
                />
                City 2
              </a>
              <hr
                class="divider"
              />
            </li>
            ,
          </div>
        `)
    })

    it('should render no cities matched message when cities list is empty', () => {
        expect.assertions(1)

        const { container } = render(
            <BrowserRouter>
                <CitiesList citiesLinks={[]} />,
            </BrowserRouter>,
        )

        expect(container).toMatchInlineSnapshot(`
          <div>
            <h2>
              Cities
            </h2>
            <p>
              No cities matched
            </p>
            ,
          </div>
        `)
    })
})

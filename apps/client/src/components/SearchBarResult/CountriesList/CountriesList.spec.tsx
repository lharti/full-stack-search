import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { CountriesList } from './CountriesList'

describe('CountriesList', () => {
    it('should render countries list', () => {
        expect.assertions(1)

        const countriesLinks = [
            {
                id: '1',

                path: '/countries/1',
                title: 'Country 1',
            },
            {
                id: '2',

                path: '/countries/2',
                title: 'Country 2',
            },
        ]

        const { container } = render(
            <BrowserRouter>
                <CountriesList countriesLinks={countriesLinks} />,
            </BrowserRouter>,
        )

        expect(container).toMatchInlineSnapshot(`
          <div>
            <h2>
              Countries
            </h2>
            <li>
              <a
                class="dropdown-item"
                data-discover="true"
                href="/countries/1"
              >
                <i
                  class="fa fa-flag mr-2"
                />
                Country 1
              </a>
              <hr
                class="divider"
              />
            </li>
            <li>
              <a
                class="dropdown-item"
                data-discover="true"
                href="/countries/2"
              >
                <i
                  class="fa fa-flag mr-2"
                />
                Country 2
              </a>
              <hr
                class="divider"
              />
            </li>
            ,
          </div>
        `)
    })

    it('should render no countries matched message when countries list is empty', () => {
        expect.assertions(1)

        const { container } = render(
            <BrowserRouter>
                <CountriesList countriesLinks={[]} />,
            </BrowserRouter>,
        )

        expect(container).toMatchInlineSnapshot(`
          <div>
            <h2>
              Countries
            </h2>
            <p>
              No countries matched
            </p>
            ,
          </div>
        `)
    })
})

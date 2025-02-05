import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { HotelsList } from './HotelsList'

describe('HotelsList', () => {
    it('should render hotels list', () => {
        expect.assertions(1)

        const hotelsLinks = [
            {
                id: '1',

                path: '/hotels/1',
                title: 'Hotel 1',
            },
            {
                id: '2',

                path: '/hotels/2',
                title: 'Hotel 2',
            },
        ]

        const { container } = render(
            <BrowserRouter>
                <HotelsList hotelsLinks={hotelsLinks} />,
            </BrowserRouter>,
        )

        expect(container).toMatchInlineSnapshot(`
          <div>
            <h2>
              Hotels
            </h2>
            <li>
              <a
                class="dropdown-item"
                data-discover="true"
                href="/hotels/1"
              >
                <i
                  class="fa fa-building mr-2"
                />
                Hotel 1
              </a>
              <hr
                class="divider"
              />
            </li>
            <li>
              <a
                class="dropdown-item"
                data-discover="true"
                href="/hotels/2"
              >
                <i
                  class="fa fa-building mr-2"
                />
                Hotel 2
              </a>
              <hr
                class="divider"
              />
            </li>
            ,
          </div>
        `)
    })

    it('should render no hotels matched message when hotels list is empty', () => {
        expect.assertions(1)

        const { container } = render(
            <BrowserRouter>
                <HotelsList hotelsLinks={[]} />,
            </BrowserRouter>,
        )

        expect(container).toMatchInlineSnapshot(`
          <div>
            <h2>
              Hotels
            </h2>
            <p>
              No hotels matched
            </p>
            ,
          </div>
        `)
    })
})

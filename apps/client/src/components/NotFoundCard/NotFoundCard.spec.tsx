import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { NotFoundCard } from './NotFoundCard'

describe('NotFoundCard', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(
            <BrowserRouter>
                <NotFoundCard />
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
})

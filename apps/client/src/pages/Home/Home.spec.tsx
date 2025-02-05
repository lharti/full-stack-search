import { HomePage } from '@/pages/Home/Home.page'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/SearchBar', () => ({
    SearchBar: vi.fn(() => 'SEARCH_BAR'),
}))

describe('HomePage', () => {
    it('should render ', () => {
        expect.assertions(1)

        const { container } = render(<HomePage />)

        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="container"
            >
              <div
                class="row height d-flex justify-content-center pt-5"
              >
                <div
                  class="col-md-6"
                >
                  SEARCH_BAR
                </div>
              </div>
            </div>
          </div>
        `)
    })
})

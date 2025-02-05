import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DropdownMenu } from './DropdownMenu'

describe('DropdownMenu', () => {
    it('should render', () => {
        expect.assertions(1)

        const { container } = render(<DropdownMenu>Test</DropdownMenu>)

        expect(container).toMatchInlineSnapshot(`
          <div>
            <div
              class="dropdown"
            >
              <menu
                class="dropdown-menu show w-100"
              >
                Test
              </menu>
            </div>
          </div>
        `)
    })
})

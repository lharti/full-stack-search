import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SearchInput } from './SearchInput'

describe('SearchInput', () => {
    it('should render SearchInput empty value', () => {
        expect.assertions(1)

        const { container } = render(
            <SearchInput
                value="Search query"
                onChange={() => {}}
                placeholder="Type here"
            />,
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
                aria-label="Type here"
                class="form-control form-input"
                placeholder="Type here"
                role="search"
                type="text"
                value="Search query"
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

    it('should render SearchInput with clear button', () => {
        expect.assertions(1)

        const { container } = render(
            <SearchInput
                value="Search query"
                onChange={() => {}}
                placeholder="Type here"
                showClearInputButton
            />,
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
                aria-label="Type here"
                class="form-control form-input"
                placeholder="Type here"
                role="search"
                type="text"
                value="Search query"
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

    it('should call onChange when input value changes', async () => {
        expect.assertions(1)

        const user = userEvent.setup()
        const onChange = vi.fn()

        render(<SearchInput value="value" onChange={onChange} />)

        const input = screen.getByRole('search')

        await user.type(input, 'n')

        expect(onChange).toHaveBeenCalledExactlyOnceWith('valuen')
    })

    it('should call onClearInputButtonClick when clear button is clicked', async () => {
        expect.assertions(1)

        const onClearInputButtonClick = vi.fn()

        render(
            <SearchInput
                value="value"
                onChange={() => {}}
                onClearInputButtonClick={onClearInputButtonClick}
            />,
        )

        const clearButton = screen.getByRole('button')

        await userEvent.click(clearButton)

        expect(onClearInputButtonClick).toHaveBeenCalledOnce()
    })
})

import * as matchers from 'jest-extended'

console.error = jest.fn()
expect.extend(matchers)

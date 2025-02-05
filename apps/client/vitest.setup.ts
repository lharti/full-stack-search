import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from 'jest-extended'
import React from 'react'
import { afterEach, expect } from 'vitest'

global.React = React

expect.extend(matchers)

afterEach(() => {
    cleanup()
})

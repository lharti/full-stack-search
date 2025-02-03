import * as actualExpress from 'express'
const express = () => ({
    use: jest.fn(),
})

const jsonMiddleware = () => {}
express.json = () => jsonMiddleware

export default express

export actualExpress

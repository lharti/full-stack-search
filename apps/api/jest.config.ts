import type { Config } from 'jest'

import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const config: Config = {
    preset: 'ts-jest',

    clearMocks: true,

    transform: {
        '^.+\\.(t|j)s$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: 'tsconfig.json',
            },
        ],
    },

    collectCoverageFrom: ['src/**/*.(t|j)s', '!src/server.ts'],

    coverageDirectory: '<rootDir>/coverage',

    testEnvironment: 'node',

    prettierPath: require.resolve('prettier-2'),

    roots: ['<rootDir>'],

    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

    modulePaths: [compilerOptions.baseUrl],

    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
}

export default config

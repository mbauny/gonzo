// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
    rootDir: path.resolve(__dirname, 'src/'),
    moduleFileExtensions: ['ts', 'js'],
    moduleDirectories: ['node_modules', 'src'],
    testEnvironment: 'node',
    testRegex: '/tests/(.*).test.ts',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
}

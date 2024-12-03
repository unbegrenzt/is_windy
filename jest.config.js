module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'app/**/*.{js,jsx,ts,tsx}',
        'pages/**/*.{js,jsx,ts,tsx}',
        'components/**/*.{js,jsx,ts,tsx}',
        '**/src/components/**/*.{js,jsx,ts,tsx}',
        '**/src/pages/**/*.{js,jsx,ts,tsx}',
        '**/src/app/**/*.{js,jsx,ts,tsx}',
    ],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
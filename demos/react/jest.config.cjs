module.exports = {
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.(ts|js)x?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {},
  transformIgnorePatterns: [],
};

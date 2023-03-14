module.exports = {
  preset: 'ts-jest/presets/default',
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.(ts|js)x?$': 'ts-jest',
  },
  transformIgnorePatterns: ['^.+\\.js$'],
};

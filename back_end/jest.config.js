/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  bail: true,
  clearMocks: true,
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
    '!src/database/firebase.json',
    '!src/server.ts',
  ],
  coverageDirectory: '__tests__/coverage',
};

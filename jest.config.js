const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/Interface/**'],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  // testRegex: 'heap.test.ts', /**Run Single Unit Test, PLEASE Remove // at the head of this line */
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' })
};
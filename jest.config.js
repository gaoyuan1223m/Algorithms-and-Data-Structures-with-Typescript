const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/Interface/**'],
  verbose: true, // Indicates whether each individual test should be reported during the run.
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  // notify: true,// show a notification panel on the right (win10)
  // projects: ["<rootDir>/src/**/*.ts"],
  // testRegex: 'rbt.test.ts', /**Run Single Unit Test, PLEASE Remove // at the head of this line */
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' })
};
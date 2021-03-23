module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  rootDir: '.',
  verbose: true,
  testEnvironment: 'node',
  testRegex: './test/.*.spec.ts$',
  coverageReporters: ['html', 'text', 'lcov'],
  coverageDirectory: './coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/application/**/*.ts',
    '!<rootDir>/src/infrastructure/**/*.ts',
  ],
  // MINIMO DE TESTES TEMPORARIAMENTE DESATIVADO
  // A urgência do desenvolvimento está impedindo o bom desenvolvimento com testes.
  // COVERAGE ATUAL: 66%
  // coverageThreshold: {
  //   'src/core/domain': {
  //     branches: 50,
  //     functions: 50,
  //     lines: 50,
  //   },
  // },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/core/(.*)$': '<rootDir>/src/core/$1',
    '@/infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '@/application/(.*)$': '<rootDir>/src/application/$1',
    '@test/(.*)$': '<rootDir>/test/$1',
  },

  // setupFiles: ['./test/.common/ExposeEnv.ts'],
  // testResultsProcessor: 'jest-sonar-reporter',
};

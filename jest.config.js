module.exports = {
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/app.module.ts',
    'src/main.ts',
    'kitchen.module.ts',
    'database.module.ts',
    'database.dto.ts',
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

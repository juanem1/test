module.exports = {
  collectCoverageFrom: [
    'src/**/*.ts',
    '!test/**/*.ts',
  ],
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },
};

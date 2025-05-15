module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!your-package-to-transform)/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Résout le chemin relatif pour l'alias `@`
  },
  globals: {
    'import.meta': {
      env: {
        VITE_BASE_URL: 'http://localhost:5173',
      },
    },
  },
};

// src/setupTests.js
import '@testing-library/jest-dom/extend-expect';

beforeAll(() => {
  global.importMeta = {
    env: {
      VITE_BASE_URL: 'http://localhost:4000', // Définir l'URL pour tes tests
    },
  };
});

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom", // Certifique-se de que está correto
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "^.+\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  // Ativando a coleta de cobertura
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["json"], // Garante que JSON seja gerado
  collectCoverageFrom: [
    "**/*.{ts,tsx}", // Inclui arquivos TypeScript
    "!**/node_modules/**", // Exclui node_modules
    "!**/.next/**", // Exclui arquivos do Next.js
    "!**/*.d.ts", // Exclui arquivos de definição de tipos
    "!<rootDir>/jest.setup.ts", // Exclui configurações
  ],
};

module.exports = createJestConfig(customJestConfig);

// const nextJest = require('next/jest');

// const createJestConfig = nextJest({
//   dir: './',
// });

// const customJestConfig = {
//   testEnvironment: 'jest-environment-jsdom', // Certifique-se de que está correto
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
//   moduleNameMapper: {
//     '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
//     '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
//     '^.+\\.(png|jpg|jpeg|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
//   },
//   testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
//   transform: {
//     '^.+\\.(ts|tsx)$': 'ts-jest',
//   },
// };

// module.exports = createJestConfig(customJestConfig);

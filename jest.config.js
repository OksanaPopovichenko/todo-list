/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["jest-extended/all", '<rootDir>/testSetup.ts'],
  globals: {
    "ts-jest": { diagnostics: false },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(jotai)/)"],
  roots: ["<rootDir>/src"],
};

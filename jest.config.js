module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/config", "<rootDir>/dist"],
  setupFiles: ["<rootDir>/support/setup-jest.ts"],
};

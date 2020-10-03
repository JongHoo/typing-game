module.exports = {
  moduleFileExtensions: ["js", "json", "json"],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '<rootDir>/**/*.spec.(js|jsx|ts|tsx)', '<rootDir>/(test/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFiles: ['<rootDir>/test/setup']
}

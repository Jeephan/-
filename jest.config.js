module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.js'],
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.test.{js,ts}'
  ],
  // 新增测试环境变量配置
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js']
};
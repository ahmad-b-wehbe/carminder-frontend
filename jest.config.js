module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.(ts|js|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.html$",
      },
    ],
  },
  moduleFileExtensions: ["ts", "html", "js", "json"],
  coverageDirectory: "<rootDir>/coverage/",
  testEnvironment: "jsdom",
};

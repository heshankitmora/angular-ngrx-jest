const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: "<rootDir>/",
});

module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setupjest.ts"],
  transformIgnorePatterns: ["^.+\\.js$"],
  moduleNameMapper,
  silent: true,
  collectCoverage: true,
  coverageReporters: ["lcov", "cobertura"],
  coverageDirectory: "<rootDir>/coverage/chart-app",
  transform: {
		"^.+\\.(ts|js|html)$": "ts-jest"
	},
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./coverage",
        outputName: "chart-app.xml",
      },
    ],
  ],
};

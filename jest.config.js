/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    modulePaths: ["<rootDir>"],
    moduleNameMapper: {
        "^obsidian$": "<rootDir>/tests/mocks/obsidian.ts",
    },
};

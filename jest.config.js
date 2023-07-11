module.exports = {

    testEnvironment: "jsdom",
    setupFilesAfterEnv: [
      "<rootDir>src/tests/setupTests.js"
    ],
    moduleNameMapper: {
        "\\.css$": "identity-obj-proxy",
        "^lodash-es$": "lodash"
    },

}
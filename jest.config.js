module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFiles: ["./tests/unit/setup.js"],
  moduleNameMapper: {
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
};

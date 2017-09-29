module.exports = {
  parser: "babel-eslint",
  rules: {
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false }
    ],
    "react/react-in-jsx-scope": 0,
    "react/display-name": 0,
    "react/prop-types": 0
  },
  extends: ["plugin:react/recommended"],
  plugins: ["react"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
};

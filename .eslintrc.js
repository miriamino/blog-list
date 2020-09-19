module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: [
      'error',
      'never',
    ],
    'no-console': 0,
    'no-underscore-dangle': [
      'error', {
        allow: [
          '_id',
          '__v',
        ],
      },

    ],
  },
}

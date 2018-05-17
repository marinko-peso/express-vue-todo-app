// Running eslinter with: npm run lint name_of_file_or_directory -s
// -s is for silent exit to avoid unneeded warnings and errors.

module.exports = {
  extends: [
    // Add more generic rule sets here, such as:
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  rules: {
    // Override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never'
    }],
  },
  env: {
    amd: true,
    commonjs: true
  }
};

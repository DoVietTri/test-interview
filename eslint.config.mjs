// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: [
      '.vscode/*',
      '.nuxt/',
      '.output/',
      'dist/',
      'node_modules/',
    ],
  },

  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': 'off'
    }
  }
)

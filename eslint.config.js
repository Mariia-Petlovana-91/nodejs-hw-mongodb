import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.node },
    rules: {
      semi: 'error',
      'no-unused-vars': ['error', { args: 'none' }],
      'no-undef': 'error',
    },
  },
];

// import globals from 'globals';
// import pluginJs from '@eslint/js';

// export default [
//   pluginJs.configs.recommended,
//   {
//     files: ['src/**/*.js'],
//     languageOptions: {
//       globals: globals.node,
//       ecmaVersion: 2021, // Для сучасного JS (ES2021)
//       sourceType: 'module', // Підтримка ESM
//     },
//     rules: {
//       semi: 'error',
//       'no-unused-vars': ['error', { args: 'none' }],
//       'no-undef': 'error',
//       'import/extensions': ['error', 'always'], // Вимога вказувати розширення
//     },
//     settings: {
//       'import/resolver': {
//         node: {
//           extensions: ['.js', '.json'], // Підтримка цих розширень для імпортів
//         },
//       },
//     },
//   },
// ];

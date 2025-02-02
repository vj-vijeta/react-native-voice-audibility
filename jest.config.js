// module.exports = {
//   preset: 'react-native',
//   transform: {
//     '^.+\\.(ts|tsx)$': ['ts-jest', { babelConfig: true }], // Ensures TypeScript files are transformed
//     '^.+\\.(js|jsx|mjs)$': 'babel-jest', // Allows Jest to process JSX files
//   },
//   transformIgnorePatterns: [
//     'node_modules/(?!(react-native|@react-native|@react-navigation|my-library)/)', // Ensures dependencies are transformed
//   ],
//   testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//   globals: {
//     'ts-jest': {
//       isolatedModules: true, // Faster TS compilation
//     },
//   },
//   moduleNameMapper: {
//     '^react-native$': '__mocks__/react-native.js'
//   }
// };
// jest.config.js
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        babelConfig: true,
        // move isolatedModules: true here
        isolatedModules: true,
      },
    ],
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|my-library)/)',
  ],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Remove the entire "globals" object:
  // globals: {
  //   'ts-jest': {
  //     isolatedModules: true,
  //   },
  // },
  moduleNameMapper: {
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
  },
};

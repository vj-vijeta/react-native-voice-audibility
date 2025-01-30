// // jest.config.js
// module.exports = {
//     preset: 'react-native',
//     transform: {
//       '^.+\\.(ts|tsx)$': 'ts-jest',  // Use ts-jest for TypeScript files
//     //   '^.+\\.(js|jsx)$': 'babel-jest',  // Use babel-jest for JS/JSX files
//     },
//     testMatch: [
//       '**/src/__tests__/**/*.test.ts',
//       '**/src/__tests__/**/*.test.tsx',
//     ],
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//     modulePathIgnorePatterns: [
//       '<rootDir>/example/node_modules',
//       '<rootDir>/lib/',
//     ],
//     transformIgnorePatterns: [
//       'node_modules/(?!(@react-native|react-native|react-navigation|react-native-vector-icons)/)', // Ensure these modules are transformed
//     ],
//     testEnvironment: 'node',

//   };
module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { babelConfig: true }], // Ensures TypeScript files are transformed
    '^.+\\.(js|jsx|mjs)$': 'babel-jest', // Allows Jest to process JSX files
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|my-library)/)', // Ensures dependencies are transformed
  ],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      isolatedModules: true, // Faster TS compilation
    },
  },
};

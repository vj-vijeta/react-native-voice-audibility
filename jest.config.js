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
      '^.+\\.(ts|tsx)$': 'ts-jest', // Transforms TypeScript files
    },
    transformIgnorePatterns: [
      'node_modules/(?!(@react-native|react-native)/)', // Ensure react-native is transformed
    ],
    testMatch: [
      '**/src/__tests__/**/*.test.ts',
      '**/src/__tests__/**/*.test.tsx',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    globals: {
        'ts-jest': {
        isolatedModules: true, // Ensures the TS files are transformed properly
        },
    }
};
// module.exports = {
//   presets: [
//     'module:metro-react-native-babel-preset',  // Essential for React Native
//     '@babel/preset-env',  // For modern JavaScript
//     '@babel/preset-react',  // For JSX support
//     '@babel/preset-typescript',  // For TypeScript
//   ],
//   plugins: [
//     '@babel/plugin-transform-flow-strip-types',
//     ['@babel/plugin-transform-class-properties', { loose: true }],
//     ['@babel/plugin-transform-private-methods', { loose: true }],
//     ['@babel/plugin-transform-private-property-in-object', { loose: true }],

//     // '@babel/plugin-transform-private-methods',
//     // '@babel/plugin-transform-private-property-in-object',
//     // ['@babel/plugin-transform-class-properties', { loose: true }],  // Ensure loose is set to true
//     // ['@babel/plugin-transform-private-methods', { loose: true }],
//     // ['@babel/plugin-transform-private-property-in-object', { loose: true }],
//   ],
// };

module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // Handles React Native, JSX, and TypeScript
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ],
};

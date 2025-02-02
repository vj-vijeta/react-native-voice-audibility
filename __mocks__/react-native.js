// __mocks__/react-native.js
/* global jest */
const actualReactNative = jest.requireActual('react-native');

module.exports = {
  ...actualReactNative,
  Platform: {
    ...actualReactNative.Platform,
    select: (obj) => obj.ios ?? obj.default,
  },
};

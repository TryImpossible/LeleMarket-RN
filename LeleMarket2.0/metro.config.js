/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// get defaults sourceExts array
const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts;

module.exports = (async () => {
  return {
    resolver: {
      sourceExts: process.env.METRO_VARIANT === 'display' ? ['display.tsx', ...defaultSourceExts] : defaultSourceExts,
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  };
})();

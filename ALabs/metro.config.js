const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// Merge the default config with any custom settings you need.
const config = mergeConfig(defaultConfig, {
  // Add any custom configuration here if needed
});

// Wrap the config with Reanimated's Metro config
module.exports = wrapWithReanimatedMetroConfig(config);

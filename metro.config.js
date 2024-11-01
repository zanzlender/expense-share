// // Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config');
//
// /** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);
//
// module.exports = config;

const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Drizzle https://orm.drizzle.team/docs/connect-expo-sqlite#expo-sqlite-migrations-with-drizzle-kit
config.resolver.sourceExts.push("sql");

module.exports = withNativeWind(config, { input: "./app/global.css" });

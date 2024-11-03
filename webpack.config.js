const webpack = require('@nativescript/webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


module.exports = (env) => {
  webpack.init(env);

  webpack.chainWebpack((config) => {
    config.resolve.fallback = {
      crypto: require.resolve("crypto-browserify"),
    };
  });

  return webpack.resolveConfig();
};

module.exports = {
    plugins: [
        new NodePolyfillPlugin()
    ]
}

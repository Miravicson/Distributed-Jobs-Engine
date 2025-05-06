// const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
// const { join } = require('path');

// module.exports = {
//   output: {
//     path: join(__dirname, '../../dist/libs/pulsar'),
//   },
//   plugins: [
//     new NxAppWebpackPlugin({
//       target: 'node',
//       compiler: 'tsc',
//       main: './src/index.ts',
//       tsConfig: './tsconfig.lib.json',
//       optimization: false,
//       outputHashing: 'none',
//       generatePackageJson: true,
//     }),
//   ],
// };

const { join } = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('../../webpack.lib.config');

module.exports = merge(commonConfig, {
  output: {
    path: join(__dirname, '../../dist/libs/pulsar'),
  },
});

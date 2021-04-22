// Support storing environment variables in a file named "cnaenv"
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

// Read environment variables from "cnaenv". Override environment vars if they are already set.
const CNAENV = path.resolve(__dirname, 'cnaenv');
if (fs.existsSync(CNAENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(CNAENV));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
}
process.env.CLIENT_ID = process.env.CLIENT_ID || process.env.SPA_CLIENT_ID;

const webpack = require('webpack');
const env = {};

// List of environment variables made available to the app
[
  'ISSUER',
  'CLIENT_ID',
].forEach(function (key) {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} must be set. See README.md`);
  }
  env[key] = JSON.stringify(process.env[key]);
});

// Added to angular's webpack config by @angular-builders/custom-webpack
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
};

// const path = require("path");
// const nodeExternals = require("webpack-node-externals");
// const Dotenv = require("dotenv-webpack");

// const clientConfig = {
//   name: "client",
//   mode: "development",
//   entry: "./client/src/main.jsx",
//   output: {
//     path: path.resolve(__dirname, "client/build"),
//     filename: "static/js/main.js",
//   },
//   resolve: {
//     extensions: [".js", ".jsx", ".json"],
//     modules: ["node_modules", "client/src"],
//     alias: {
//       "@": path.resolve(__dirname, "client/src"),
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-env", "@babel/preset-react"],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader", "postcss-loader"],
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)$/i,
//         type: "asset/resource",
//       },
//     ],
//   },
// };

// const serverConfig = {
//   name: "server",
//   mode: "development",
//   entry: "./api/src/server.js",
//   target: "node",
//   externals: [nodeExternals()],
//   output: {
//     path: path.resolve(__dirname, "api/build"),
//     filename: "server.js",
//   },
//   resolve: {
//     extensions: [".js", ".jsx", ".json"],
//     modules: ["node_modules", "client/src"],
//     alias: {
//       "@": path.resolve(__dirname, "client/src"),
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-env", "@babel/preset-react"],
//           },
//         },
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)$/i,
//         type: "asset/resource",
//       },
//       {
//         test: /\.css$/,
//         use: "null-loader", // Utilisez null-loader pour ignorer les fichiers CSS côté serveur
//       },
//     ],
//   },
// };

// module.exports = [clientConfig, serverConfig];

const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./api/server.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};

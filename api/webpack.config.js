// const path = require("path");
// const nodeExternals = require("webpack-node-externals");

// module.exports = {
//   entry: "./src/index.js",
//   target: "node",
//   externals: [nodeExternals()],
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "bundle.js",
//   },
//   mode: "development", // Ajoutez cette ligne
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
//         test: /\.(png|jpe?g|gif|svg)$/,
//         use: [
//           {
//             loader: "file-loader",
//             options: {
//               name: "[name].[ext]",
//               outputPath: "images/",
//             },
//           },
//         ],
//       },
//       {
//         test: /\.css$/,
//         use: ["style-loader", "css-loader", "postcss-loader"],
//       },
//     ],
//   },
//   resolve: {
//     extensions: [".js", ".jsx"],
//   },
// };

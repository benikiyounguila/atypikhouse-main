// import path from 'path';

// export default {
//   mode: 'development',
//   entry: './src/client.js',
//   output: {
//     path: path.resolve('dist'),
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       // Loader pour les fichiers JavaScript et JSX
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       // Loader pour les fichiers CSS
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader', 'postcss-loader'],
//       },
//       // Loader pour les fichiers d'images (PNG, JPG, etc.)
//       {
//         test: /\.(png|jpg|jpeg|gif|svg)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name].[hash].[ext]',
//               outputPath: 'images/',
//             },
//           },
//         ],
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//     alias: {
//       '@': path.resolve('src'),
//     },
//   },
// };



// import path from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin'; // Import du plugin

// export default {
//   mode: 'development',
//   entry: './src/client.js',
//   output: {
//     path: path.resolve('dist'), // Utilisation de path.resolve directement
//     filename: 'bundle.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader', 'postcss-loader'], // Assurez-vous d'ajouter les loaders pour le CSS si nécessaire
//       },
//       {
//         test: /\.(png|jpg|gif|svg)$/,
//         use: ['file-loader'], // Ajoute un loader pour gérer les images
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//     alias: {
//       '@': path.resolve('src'),
//     },
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve('src', 'public', 'index.html'), // Met à jour le chemin sans __dirname
//       filename: 'index.html', // Nom du fichier généré dans le dossier dist
//     }),
//   ],
//   devServer: {
//     contentBase: path.resolve('dist'), // Serveur pointant vers dist
//     open: true, // Ouvrir le navigateur automatiquement
//   },
// };


import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  mode: 'development',
  entry: './src/client.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve('src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'public', 'index.html'),
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: path.resolve('dist'), // Remplacer contentBase par static
    open: true, // Ouvrir le navigateur automatiquement
    hot: true,  // Activer le rechargement à chaud
    port: 8080, // Spécifie le port si nécessaire
  },
};

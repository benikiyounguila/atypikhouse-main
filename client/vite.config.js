// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// // https://vitejs.dev/config/
// export default defineConfig({
//   optimizeDeps: {
//     exclude: ['dotenv', 'path'], // Exclure les modules spécifiques à Node.js
//   },
//   plugins: [react()],
//   // server: {
//   //   proxy: {
//   //     '/api': 'http://localhost:5173',
//   //   },
//   // },

//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000', // Remplacez par votre serveur local
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },

//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// });
// client/vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: true,
    ssrManifest: true,
    rollupOptions: {
      input: {
        client: path.resolve(__dirname, 'index.html'),
      },
    },
    outDir: 'dist',
  },
  ssr: {
      noExternal: ['react-helmet-async'],
  },
  define: {
    'process.env': {
      VITE_BASE_URL: JSON.stringify(process.env.VITE_BASE_URL),
    },
  },
});

// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default {
//   reactStrictMode: true,
//   pageExtensions: ['jsx', 'js'],
//   webpack(config) {
//     config.resolve.alias['@'] = path.join(__dirname, 'src');
//     return config;
//   },
// };
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  reactStrictMode: true,
  pageExtensions: ['jsx', 'js'],
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
};

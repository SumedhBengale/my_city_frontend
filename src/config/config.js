import devConfig from './config.dev.js';
import prodConfig from './config.prod.js';

let config;

if (process.env.NODE_ENV === 'production') {
  config = prodConfig;
} else {
  config = devConfig;
}

export default config;

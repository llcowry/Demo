import defaultConfig from './default.mjs';
import developmentConfig from './development.mjs';
import productionConfig from './production.mjs';

const env = process.env.NODE_ENV || 'development';

let environmentConfig;

switch (env) {
  case 'production':
    environmentConfig = productionConfig;
    break;
  case 'development':
  default:
    environmentConfig = developmentConfig;
    break;
}

const config = {
  ...defaultConfig,
  ...environmentConfig,
};

export default config;

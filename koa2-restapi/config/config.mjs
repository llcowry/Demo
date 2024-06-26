import defaultConfig from './default.mjs';
import developmentConfig from './development.mjs';
import productionConfig from './production.mjs';

const env = process.env.NODE_ENV || 'default';

let environmentConfig = {};
console.log(env);
switch (env) {
  case 'production':
    environmentConfig = productionConfig;
    break;
  case 'development':
    environmentConfig = developmentConfig;
    break;
  default:
    break;
}

const config = {
  ...defaultConfig,
  ...environmentConfig,
};

export default config;

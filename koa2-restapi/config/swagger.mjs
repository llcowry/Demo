import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.mjs';
import swaggerJsdoc from 'swagger-jsdoc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = config.PORT;

export default {
  routePrefix: '/swagger',
  swaggerOptions: {
    spec: swaggerJsdoc({
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Koa2 REST API',
          version: '1.0.0',
          description: 'API Documentation',
        },
        servers: [
          {
            url: `http://localhost:${PORT}/api`,
            description: 'Koa2 REST API server',
          },
        ],
      },
      apis: [path.join(__dirname, '../routes/*.mjs')],
    }),
  },
};

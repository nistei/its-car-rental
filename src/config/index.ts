import * as fs from 'fs';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'path';

export default () => ({
  logger: {
    level: process.env.LOGGER_LEVEL || 'debug',
    format: getLoggingFormat(process.env.LOGGER_FORMAT),
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    database: process.env.DATABASE_DATABASE || 'its_car_rental',
    username: process.env.DATABASE_USERNAME || 'its_car_rental',
    password: envOrFile('DATABASE_PASSWORD', 'db_password'),
    logging: process.env.DATABASE_LOGGING || 'error',
    connectionLimit: parseInt(process.env.DATABASE_CONN_LIMIT) || 10,
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
  },
  auth: {
    secret: envOrFile('AUTH_SECRET', 'jwt_secret') || 'its-car-rental',
    expires: process.env.AUTH_EXPIRES || '12h',
  },
});

function envOrFile(envName: string, defaultPath?: string): string {
  if (process.env[envName]) {
    return process.env[envName];
  }

  if (process.env[envName + '_FILE']) {
    return fs.readFileSync(process.env[envName + '_FILE']).toString();
  }

  const basePath = process.env.SECRET_BASE_PATH || './secrets';
  const filePath = path.join(basePath, defaultPath);

  if (filePath && fs.existsSync(filePath)) {
    return fs.readFileSync(filePath).toString();
  }

  return "";
}

// Excluded till needed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function envBool(envName: string, defaultValue: boolean): boolean {
  if (process.env[envName]) {
    return process.env[envName].toLowerCase() === 'true';
  }

  return defaultValue;
}

function getLoggingFormat(env: string) {
  switch (env) {
    case 'json':
    default:
      return winston.format.json();
    case 'splat':
      return winston.format.splat();
    case 'nest':
      return  nestWinstonModuleUtilities.format.nestLike();
  }
}

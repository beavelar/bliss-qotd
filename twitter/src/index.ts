import dotenv from 'dotenv';
import { init } from './twitter-util/bot';
import { buildEnvironmentKeys } from './environment-keys/environment-keys';

const dotEnvKeys = dotenv.config().parsed;
const env = process.env.DOCKER_ENV ? buildEnvironmentKeys(dotEnvKeys) : dotEnvKeys;
init(env);
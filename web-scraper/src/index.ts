import dotenv from 'dotenv';
import { init } from './web/server';
import { buildEnvironmentKeys } from './util/environment-keys/environment-keys';

const dotEnvKeys = dotenv.config().parsed;
const env = process.env.DOCKER_ENV ? buildEnvironmentKeys(dotEnvKeys) : dotEnvKeys;
init(env);
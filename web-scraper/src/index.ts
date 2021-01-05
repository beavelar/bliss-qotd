import dotenv from 'dotenv';
import { init } from './web/server';

const env = dotenv.config().parsed;
init(env);
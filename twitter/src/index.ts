import dotenv from 'dotenv';
import { init } from './twitter-util/bot';

const env = dotenv.config().parsed;
init(env);
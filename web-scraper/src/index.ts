import dotenv from 'dotenv';
import { init } from './web/bot';

const env = dotenv.config().parsed;
init(env);
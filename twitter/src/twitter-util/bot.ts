import Twitter from 'twitter';
import { logger } from '../logging/logger';
import { LevelEnum } from '../logging/LevelEnum';
import { getTweet, postTweet } from '../twitter-util/twitter-util';
import { getTwitterConfig, validEnvironmentKeys } from '../environment-keys/environment-keys';

export function init(env: any): void {
  if (validEnvironmentKeys(env)) {
    const config = getTwitterConfig(env);
    const bot = new Twitter(config);
    // Scheduler to post tweets at 7AM, 12PM, and 5PM
    logger(LevelEnum.LOG, 'Starting up Twitter bot interval');
    const interval = setInterval(() => {
      const date = new Date();
      if (date.getUTCMinutes() === 0 && (date.getUTCHours() === 14 || date.getUTCHours() === 19 || date.getUTCHours() === 0)) {
        logger(LevelEnum.LOG, 'Target time frame reached, retrieving Tweet');
        getTweet(env, bot).then((response) => {
          postTweet(bot, response);
        }).catch((error) => {
          logger(LevelEnum.ERROR, 'Error occurred in bot.init', error);
        });
      }
    }, 60*1000);
    logger(LevelEnum.LOG, 'Twitter bot interval started');
  }
  else {
    logger(LevelEnum.ERROR, 'Unable to start, verify required environment variables are filled');
  }
}
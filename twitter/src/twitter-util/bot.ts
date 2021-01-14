import Twitter from 'twitter';
import { getTweet, postTweet } from '../twitter-util/twitter-util';
import { getTwitterConfig, validEnvironmentKeys } from '../environment-keys/environment-keys';

export function init(env: any): void {
  if (validEnvironmentKeys(env)) {
    const config = getTwitterConfig(env);
    const bot = new Twitter(config);
    console.log('-----------------------------------------------------------------------------');
    console.log('Starting up Twitter bot interval');
    console.log('-----------------------------------------------------------------------------');
    // Scheduler to post tweets at 7AM, 12PM, and 5PM
    const interval = setInterval(() => {
      const date = new Date();
      if (date.getMinutes() === 0 && (date.getHours() === 7 || date.getHours() === 12 || date.getHours() === 17)) {
        console.log('-----------------------------------------------------------------------------');
        console.log('Target time frame reached, retrieving Tweet');
        console.log('-----------------------------------------------------------------------------');
        getTweet(env, bot).then((response) => {
          postTweet(bot, response);
        }).catch((error) => {
          console.error('-----------------------------------------------------------------------------');
          console.error('Error occurred in bot.init');
          console.error(`${error}`);
          console.error('-----------------------------------------------------------------------------');
        });
      }
    }, 60*1000);
    console.log('-----------------------------------------------------------------------------');
    console.log('Twitter bot interval started');
    console.log('-----------------------------------------------------------------------------');
  }
  else {
    console.error('-----------------------------------------------------------------------------');
    console.error('Unable to start, verify required environment variables are filled');
    console.error('-----------------------------------------------------------------------------');
  }
}
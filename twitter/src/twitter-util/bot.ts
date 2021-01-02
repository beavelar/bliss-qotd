import axios from 'axios';
import Twitter from 'twitter';
import { postTweet } from '../twitter-util/twitter-util';
import { getTweetSearchConfig, getTwitterConfig, validEnvironmentKeys } from '../environment-keys/environment-keys';

export function init(env: any): void {
  if (validEnvironmentKeys(env)) {
    const config = getTwitterConfig(env);
    const bot = new Twitter(config);
    const searchConfig = getTweetSearchConfig(env);

    // Scheduler to post tweets at 7AM, 12PM, and 5PM
    const interval = setInterval(() => {
      const date = new Date();
      if (date.getMinutes() === 0 && (date.getHours() === 7 || date.getHours() === 12 || date.getHours() === 17)) {
        axios.get(`http://${env.WEB_SCRAPER_HOSTNAME}:${env.WEB_SCRAPER_PORT}`)
          .then((response) => {
            const tweet = {
              status: response.data
            };

            bot.get('statuses/user_timeline', searchConfig, (err, data, response) => {
              let currentAttempt = 0;
              let tweetExists = false;
          
              if (!err) {
                for (const key of Object.keys(data)) {
                  if (data[key].text === tweet.status) {
                    tweetExists = true;
                    break;
                  }
                }
          
                if (tweetExists) {
                  while (tweetExists && currentAttempt < env.MAX_TWEET_ATTEMPTS) {
                    // TODO: Implement ability to request and post another tweet
                    console.log('Tweet exists, retrieving another Tweet..');
                    currentAttempt++;
                  }
                }
                else {
                  postTweet(bot, tweet);
                }
              }
              else {
                console.log(err);
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 60*1000);
  }
  else {
    console.error('Unable to start, verify required environment variables are filled');
  }
}
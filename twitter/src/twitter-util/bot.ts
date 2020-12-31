// import express from 'express';
import Twitter from 'twitter';
import { postTweet } from '../twitter-util/twitter-util';
import { validEnvironmentKeys } from '../environment-keys/environment-keys';

export function init(env: any): void {
  if (validEnvironmentKeys(env)) {
    // const app = express();
  
    // app.get('/', (req, res) => {
    //   res.send('The sedulous hyena ate the antelope!');
    // });
  
    const config = {
      consumer_key: env.CONSUMER_KEY,
      consumer_secret: env.CONSUMER_SECRET,
      access_token_key: env.ACCESS_TOKEN_KEY,
      access_token_secret: env.ACCESS_TOKEN_SECRET
    }
  
    const bot = new Twitter(config);
  
    // Generic tweet
    // TODO: Replace with response for web scraper
    const tweet = {
      status: 'Hello wonderful world!'
    };
  
    // Set up Tweet search parameters
    var params = {
      screen_name: 'BlissQOTD',
      count: 21
    }
  
    // Scheduler to post tweets at 7AM, 12PM, and 5PM
    const interval = setInterval(() => {
      const date = new Date();
      if (date.getMinutes() === 0 && (date.getHours() === 7 || date.getHours() === 12 || date.getHours() === 17)) {
        bot.get('statuses/user_timeline', params, (err, data, response) => {
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
      }
    }, 60*1000);
  }
  else {
    console.error('Unable to start, verify required environment variables are filled');
  }
}
import dotenv from 'dotenv';
import Twitter from 'twitter';
import { validEnvironmentKeys } from './environment-keys/environment-keys';

const env = dotenv.config().parsed;

if (validEnvironmentKeys(env)) {
  // --------------------------------------------------------------------------------
  // TODO: Implement express aspect of application
  //
  // import express from 'express';

  // const app = express();
  // const port = 3000;

  // app.get('/', (req, res) => {
  //   res.send('The sedulous hyena ate the antelope!');
  // });

  // app.listen(port, () => {
  //   return console.log(`server is listening on ${port}`);
  // });
  //
  // --------------------------------------------------------------------------------

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
    status: 'Hello world!'
  };

  // Scheduler to post tweets at 7AM, 12PM, and 5PM
  const interval = setInterval(() => {
    const date = new Date();
    if (date.getMinutes() === 0 && (date.getHours() === 7 || date.getHours() === 12 || date.getHours() === 17)) {
      bot.post('statuses/update', tweet, (error, data, response) => {
        if (!error) {
          console.log(`Successfully tweeted ${tweet}`); // `
        }
        else {
          console.error(error);
        }
      });
    }
  }, 60*1000);

  // --------------------------------------------------------------------------------
  // Retrieve tweets
  // TODO: Implement ability to search previous tweets and compare to expected tweet
  // 
  // Set up your search parameters
  // var params = {
  //   q: 'd#nodejs',
  //   count: 10,
  //   result_type: 'recent',
  //   lang: 'en'
  // }
  
  // bot.get('statuses/update', params, (err, data, response) => {
  //   if (!err) {
  //     console.log('Data', data);
  //   }
  //   else {
  //     console.log(err);
  //   }
  // });
  //
  // --------------------------------------------------------------------------------
}
else {
  console.error('Unable to start, verify required environment variables are filled');
}
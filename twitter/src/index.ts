// import express from 'express';

// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('The sedulous hyena ate the antelope!');
// });

// app.listen(port, () => {
//   return console.log(`server is listening on ${port}`);
// });

import dotenv from 'dotenv';
import Twitter from 'twitter';

const env = dotenv.config();
const config = {
  consumer_key: env.parsed.CONSUMER_KEY,
  consumer_secret: env.parsed.CONSUMER_SECRET,
  access_token_key: env.parsed.ACCESS_TOKEN_KEY,
  access_token_secret: env.parsed.ACCESS_TOKEN_SECRET
}

const bot = new Twitter(config);

// Set up your search parameters
var params = {
  q: 'd#nodejs',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

bot.get('search/tweets', params, (err, data, response) => {
  if (!err) {
    console.log('Data', data);
  }
  else {
    console.log(err);
  }
});
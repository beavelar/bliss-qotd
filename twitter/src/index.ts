// import express from 'express';

// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('The sedulous hyena ate the antelope!');
// });

// app.listen(port, () => {
//   return console.log(`server is listening on ${port}`);
// });

import Twitter from 'twitter';

// TODO: Figure out how this block can be removed
const config = {

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
import { Tweet } from "./Tweet";
import Twitter from "twitter";

export function postTweet(bot: Twitter, tweet: Tweet): void {
  bot.post('statuses/update', tweet, (error, data, response) => {
    if (!error) {
      console.log(`Successfully tweeted ${tweet}`); // `
    }
    else {
      console.error(error);
    }
  });
}
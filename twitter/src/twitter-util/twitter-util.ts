import Twitter from "twitter";
import { Tweet } from "./Tweet";
import axios, { AxiosResponse } from "axios";
import { EnvironmentKeys, getTweetSearchConfig } from "../environment-keys/environment-keys";

export async function getTweet(env: EnvironmentKeys, bot: Twitter): Promise<Tweet | undefined> {
  try {
    let currentAttempt = 0;
    const searchConfig = getTweetSearchConfig(env);
    const previousTweets =  await bot.get('statuses/user_timeline', searchConfig);

    while (currentAttempt < env.MAX_TWEET_ATTEMPTS) {
      currentAttempt++;

      const scraperResponse = await axios.get(`http://${env.WEB_SCRAPER_HOSTNAME}:${env.WEB_SCRAPER_PORT}/web-scraper`);
      if (validTweet(previousTweets, scraperResponse)) {
        return {
          status: scraperResponse.data
        }
      }
      else {
        console.log('Tweet already exists, retrieving another Tweet');
        console.log(`Retrieved Tweet: ${scraperResponse.data}`); // `
      }
    }

    console.log('Max attempts reached, unable to obtain valid Tweet');
    return undefined;
  }
  catch (error) {
    console.error('Error occured in scraper-util.getResponse');
    console.error(`Error: ${error}`);
    throw error;
  }
}

export function postTweet(bot: Twitter, tweet: Tweet | undefined): void {
  if (tweet) {
    bot.post('statuses/update', tweet, (error, data, response) => {
      if (!error) {
        console.log('Successfully tweeted!');
        console.log(`Tweet: ${tweet}`); // `
      }
      else {
        console.error('Error occurred in twitter-util.postTweet');
        console.error(`Error: ${error}`); // `
      }
    });
  }
}

function validTweet(previousTweets: Twitter.ResponseData, scraperResponse: AxiosResponse<any>): boolean {
  for (const key of Object.keys(previousTweets)) {
    if (previousTweets[key].text === scraperResponse.data) {
      return false;
    }
  }

  return true;
}
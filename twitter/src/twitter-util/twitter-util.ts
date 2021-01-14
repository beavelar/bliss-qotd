import axios from "axios";
import Twitter from "twitter";
import { Tweet } from "scr/twitter-util/tweet";
import { EnvironmentKeys, getTweetSearchConfig } from "../environment-keys/environment-keys";

export async function getTweet(env: EnvironmentKeys, bot: Twitter): Promise<Tweet | undefined> {
  try {
    let currentAttempt = 0;
    const searchConfig = getTweetSearchConfig(env);
    const previousTweets =  await bot.get('statuses/user_timeline', searchConfig);
    const webScraperUrl = `http://${env.WEB_SCRAPER_HOSTNAME}:${env.WEB_SCRAPER_PORT}/web-scraper`; // `
    const params = {
      params: {
        limit: env.TWEET_CHARACTER_LIMIT
      }
    };

    while (currentAttempt < env.MAX_TWEET_ATTEMPTS) {
      currentAttempt++;
      const scraperResponse = await axios.get(webScraperUrl, params);
      const tweet = `"${scraperResponse.data.quote}" -${scraperResponse.data.author} #BlissQOTD`; // `
      if (validTweet(previousTweets, tweet)) {
        return {
          status: tweet
        }
      }
      else {
        console.log('-----------------------------------------------------------------------------');
        console.log('Tweet already exists, retrieving another Tweet');
        console.log(`Retrieved Tweet: ${scraperResponse.data}`); // `
        console.log('-----------------------------------------------------------------------------');
      }
    }

    console.log('-----------------------------------------------------------------------------');
    console.log('Max attempts reached, unable to obtain valid Tweet');
    console.log('-----------------------------------------------------------------------------');
    return undefined;
  }
  catch (error) {
    console.error('-----------------------------------------------------------------------------');
    console.error('Error occured in scraper-util.getResponse');
    console.error(`${error}`);
    console.error('-----------------------------------------------------------------------------');
    throw error;
  }
}

export function postTweet(bot: Twitter, tweet: Tweet | undefined): void {
  if (tweet) {
    bot.post('statuses/update', tweet, (error, data, response) => {
      if (!error) {
        console.log('-----------------------------------------------------------------------------');
        console.log('Successfully tweeted!');
        console.log(`Tweet: ${tweet}`); // `
        console.log('-----------------------------------------------------------------------------');
      }
      else {
        console.error('-----------------------------------------------------------------------------');
        console.error('Error occurred in twitter-util.postTweet');
        console.error(`${error}`); // `
        console.error('-----------------------------------------------------------------------------');
      }
    });
  }
}

function validTweet(previousTweets: Twitter.ResponseData, tweet: string): boolean {
  for (const key of Object.keys(previousTweets)) {
    if (previousTweets[key].text === tweet) {
      return false;
    }
  }

  return true;
}
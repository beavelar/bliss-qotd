import axios from "axios";
import Twitter from "twitter";
import { logger } from "../logging/logger";
import { Tweet } from "src/twitter-util/tweet";
import { LevelEnum } from "../logging/LevelEnum";
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
        logger(LevelEnum.LOG, 'Tweet already exists, retrieving another Tweet');
        logger(LevelEnum.LOG, `Retrieved Tweet: ${scraperResponse.data}`); // `
      }
    }

    logger(LevelEnum.LOG, 'Max attempts reached, unable to obtain valid Tweet');
    return undefined;
  }
  catch (error) {
    logger(LevelEnum.ERROR, 'Error occured in scraper-util.getResponse', error);
    throw error;
  }
}

export function postTweet(bot: Twitter, tweet: Tweet | undefined): void {
  if (tweet) {
    bot.post('statuses/update', tweet, (error, data, response) => {
      if (!error) {
        logger(LevelEnum.LOG, 'Successfully tweeted!');
        logger(LevelEnum.LOG, `Tweet: ${tweet}`); // `
      }
      else {
        logger(LevelEnum.ERROR, 'Error occurred in twitter-util.postTweet', error);
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
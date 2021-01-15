import Twitter from "twitter";
import { logger } from "../logging/logger";
import { LevelEnum } from "../logging/LevelEnum";
import { SearchConfig } from "src/twitter-util/tweet";

export interface EnvironmentKeys {
  TWITTER_HANDLE: string,
  TWEET_CHARACTER_LIMIT: number,
  MAX_TWEET_SEARCH: number,
  MAX_TWEET_ATTEMPTS: number,
  WEB_SCRAPER_HOSTNAME: string,
  WEB_SCRAPER_PORT: number,
  CONSUMER_KEY: string,
  CONSUMER_SECRET: string,
  ACCESS_TOKEN_KEY: string,
  ACCESS_TOKEN_SECRET: string
}

export function getTwitterConfig(env: EnvironmentKeys): Twitter.AccessTokenOptions {
  return {
    consumer_key: env.CONSUMER_KEY,
    consumer_secret: env.CONSUMER_SECRET,
    access_token_key: env.ACCESS_TOKEN_KEY,
    access_token_secret: env.ACCESS_TOKEN_SECRET
  }
}

export function getTweetSearchConfig(env: EnvironmentKeys): SearchConfig {
  return {
    screen_name: env.TWITTER_HANDLE,
    count: env.MAX_TWEET_SEARCH
  }
}

export function buildEnvironmentKeys(dotEnvKeys: any): object {
  const env = dotEnvKeys;
  env.WEB_SCRAPER_HOSTNAME = process.env.WEB_SCRAPER_HOSTNAME;
  env.WEB_SCRAPER_PORT = process.env.WEB_SCRAPER_PORT;
  return env;
}

export function validEnvironmentKeys(envKeys: any): envKeys is EnvironmentKeys {
  if (envKeys) {
    const schema: Record<keyof EnvironmentKeys, string> = {
      TWITTER_HANDLE: 'string',
      TWEET_CHARACTER_LIMIT: 'number',
      MAX_TWEET_SEARCH: 'number',
      MAX_TWEET_ATTEMPTS: 'number',
      WEB_SCRAPER_HOSTNAME: 'string',
      WEB_SCRAPER_PORT: 'number',
      CONSUMER_KEY: 'string',
      CONSUMER_SECRET: 'string',
      ACCESS_TOKEN_KEY: 'string',
      ACCESS_TOKEN_SECRET: 'string'
    }

    const missingProperties = Object.keys(schema)
      .filter(key => envKeys[key] === undefined)
      .map(key => key as keyof EnvironmentKeys)
      .map(key => logger(LevelEnum.ERROR, `Missing Environment Key: ${key}`)); // `

    return missingProperties.length === 0;
  }
  else {
    return false;
  }
}
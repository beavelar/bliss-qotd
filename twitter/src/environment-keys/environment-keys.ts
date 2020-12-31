interface EnvironmentKeys {
  CONSUMER_KEY: string,
  CONSUMER_SECRET: string,
  ACCESS_TOKEN_KEY: string,
  MAX_TWEET_ATTEMPTS: number,
  ACCESS_TOKEN_SECRET: string
}

export function validEnvironmentKeys(envKeys: any): envKeys is EnvironmentKeys {
  if (envKeys) {
    const schema: Record<keyof EnvironmentKeys, string> = {
      CONSUMER_KEY: 'string',
      CONSUMER_SECRET: 'string',
      ACCESS_TOKEN_KEY: 'string',
      MAX_TWEET_ATTEMPTS: 'number',
      ACCESS_TOKEN_SECRET: 'string'
    }

    const missingProperties = Object.keys(schema)
      .filter(key => envKeys[key] === undefined)
      .map(key => key as keyof EnvironmentKeys)
      .map(key => console.error(`Environment keys is missing ${key}`)); // `

    return missingProperties.length === 0;
  }
  else {
    return false;
  }
}
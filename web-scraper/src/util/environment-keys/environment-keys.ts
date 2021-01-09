export interface EnvironmentKeys {
  WEB_SCRAPER_PORT: number,
  MAX_REQUEST_ATTEMPTS: number,
  GOOD_READS_INSPIRATION_LINK: string,
  GOOD_READS_INSPIRATIONAL_LINK: string
}

export function validEnvironmentKeys(envKeys: any): envKeys is EnvironmentKeys {
  if (envKeys) {
    const schema: Record<keyof EnvironmentKeys, string> = {
      WEB_SCRAPER_PORT: 'number',
      MAX_REQUEST_ATTEMPTS: 'number',
      GOOD_READS_INSPIRATION_LINK: 'string',
      GOOD_READS_INSPIRATIONAL_LINK: 'string'
    }

    const missingProperties = Object.keys(schema)
      .filter(key => envKeys[key] === undefined)
      .map(key => key as keyof EnvironmentKeys)
      .map(key => console.error(`Missing Environment Key: ${key}`)); // `

    return missingProperties.length === 0;
  }
  else {
    return false;
  }
}
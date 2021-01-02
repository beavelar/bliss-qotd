interface EnvironmentKeys {
  WEB_SCRAPER_PORT: number
}

export function validEnvironmentKeys(envKeys: any): envKeys is EnvironmentKeys {
  if (envKeys) {
    const schema: Record<keyof EnvironmentKeys, string> = {
      WEB_SCRAPER_PORT: 'number'
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
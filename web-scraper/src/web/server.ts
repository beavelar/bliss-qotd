import express from "express";
import { validEnvironmentKeys } from "../environment-keys/environment-keys";

export function init(env: any): void {
  if (validEnvironmentKeys(env)) {
    const app = express();
  
    app.get('/web-scraper', (req, res) => {
      console.log('Received GET request');
      res.send('Hello world!');
    });

    app.listen(env.WEB_SCRAPER_PORT, () => {
      console.log(`Listening on port ${env.WEB_SCRAPER_PORT}`); // `
    });
  }
  else {
    console.error('Unable to start, verify required environment variables are filled');
  }
}
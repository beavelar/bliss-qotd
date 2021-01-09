import express from "express";
import { request } from "./scraper";
import { validEnvironmentKeys } from "../util/environment-keys/environment-keys";

export function init(env: any): void {
  if (validEnvironmentKeys(env)) {
    const app = express();
  
    app.get('/web-scraper', (req, res) => {
      console.log('-----------------------------------------------------------------------------');
      console.log('Received GET request');
      console.log('-----------------------------------------------------------------------------');
      const charLimit = typeof req.query.limit === 'string' ? parseInt(req.query.limit): 0;
      request(env, charLimit).then((response) => {
        console.log('-----------------------------------------------------------------------------');
        console.log(`Response: ${JSON.stringify(response)}`);
        console.log('-----------------------------------------------------------------------------');
        res.send(response);
      }).catch((error) => {
        console.error('-----------------------------------------------------------------------------');
        console.error('Error occurred in server.init');
        console.error(`${error}`); // `
        console.error('-----------------------------------------------------------------------------');
        res.send('ERROR');
      });
    });

    app.listen(env.WEB_SCRAPER_PORT, () => {
      console.log('-----------------------------------------------------------------------------');
      console.log('Server is up and listening');
      console.log(`Port: ${env.WEB_SCRAPER_PORT}`); // `
      console.log('-----------------------------------------------------------------------------');
    });
  }
  else {
    console.error('-----------------------------------------------------------------------------');
    console.error('Unable to start, verify required environment variables are filled');
    console.error('-----------------------------------------------------------------------------');
  }
}
import express from "express";
import { request } from "./scraper";
import { logger } from "../util/logging/logger";
import { LevelEnum } from "../util/logging/LevelEnum";
import { validEnvironmentKeys } from "../util/environment-keys/environment-keys";

export function init(env: any): void {
  if (validEnvironmentKeys(env)) {
    const app = express();
  
    app.get('/web-scraper', (req, res) => {
      logger(LevelEnum.LOG, 'Received GET request');
      const charLimit = typeof req.query.limit === 'string' ? parseInt(req.query.limit): 0;
      request(env, charLimit).then((response) => {
        logger(LevelEnum.LOG, `Response: ${JSON.stringify(response)}`); // `
        res.send(response);
      }).catch((error) => {
        logger(LevelEnum.ERROR, 'Error occurred in server.init', error);
        res.send('ERROR');
      });
    });

    app.listen(env.WEB_SCRAPER_PORT, () => {
      logger(LevelEnum.LOG, 'Server is up and listening');
      logger(LevelEnum.LOG, `Port: ${env.WEB_SCRAPER_PORT}`); // `
    });
  }
  else {
    logger(LevelEnum.ERROR, 'Unable to start, verify required environment variables are filled');
  }
}
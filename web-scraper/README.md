# Web-Scraper Implementation
This directory contains the code implementation for the **Web-Scraper** side of the **BlissQOTD** Twitter bot.

Follow the bot on [Twitter](https://twitter.com/BlissQOTD)

## Quick Links:
- [Project Requirements](#project-requirements)
- [Bot Permission Requirements](#bot-permission-requirements)
- [Stand-Alone Project Setup](#stand-alone-project-setup)

----------------------------------

## Project Requirements
- Node.JS
  - [Node.JS Organization Website](https://nodejs.org/en/)
- Packages
  - Axios: [Axios Documentation](https://www.npmjs.com/package/axios)
  - Cheerio: [Cheerio Documentation](https://www.npmjs.com/package/cheerio)
  - Dotenv: [Dotenv Documentation](https://www.npmjs.com/package/dotenv)
  - Express: [Express Documentation](https://www.npmjs.com/package/express)
  - ESLint: [ESLint Documentation](https://www.npmjs.com/package/eslint)
  - Typescript: [Typescript Documentation](https://www.npmjs.com/package/typescript)

To install the required packages using the **package.json** file, execute the following command:
- ***npm install***

## Stand-Alone Project Setup
- Clone the repository
- After cloning the repository, you should have a **BlissQOTD** directory, navigate to the ***BlissQOTD/web-scraper*** directory 
- Create a **.env** file
  - Use the **.env.template** file as a template
- In the **.env** file, modify the following fields
  - **WEB_SCRAPER_PORT**=***Web-Scraper Port***
- Open a command link window of choice
  - Command Prompt, GitBash, etc.
- In the ***BlissQOTD/web-scraper*** directory, execute the following command to start up the bot
  - ***npm start***
- View logs and verify no startup errors appear
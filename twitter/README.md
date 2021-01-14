# Twitter Bot Implementation
This directory contains the code implementation for the **Twitter** side of the **BlissQOTD** Twitter bot.

Follow the bot on [Twitter](https://twitter.com/BlissQOTD)

## Quick Links:
- [Project Requirements](#project-requirements)
- [Optional Setup](#optional-setup)
- [Bot Permission Requirements](#bot-permission-requirements)
- [Stand-Alone Project Setup](#stand-alone-project-setup)
- [Docker Setup](#docker-setup)

----------------------------------

## Project Requirements
- Node.JS
  - [Node.JS Organization Website](https://nodejs.org/en/)
- Packages
  - Axios: [Axios Documentation](https://www.npmjs.com/package/axios)
  - Dotenv: [Dotenv Documentation](https://www.npmjs.com/package/dotenv)
  - Twitter: [Twitter Documentation](https://www.npmjs.com/package/twitter)
  - ESLint: [ESLint Documentation](https://www.npmjs.com/package/eslint)
  - Typescript: [Typescript Documentation](https://www.npmjs.com/package/typescript)

To install the required packages using the **package.json** file, execute the following command:
- ***npm install***

## Optional Setup
- Docker
  - [Docker Installation Guide](https://docs.docker.com/get-docker/)

## Bot Permission Requirements
The following are permission requirements needed by the **BlissQOTD** bot
 - Read permissions
 - Write permissions

## Stand-Alone Project Setup
- Clone the repository
- After cloning the repository, you should have a **BlissQOTD** directory, navigate to the ***BlissQOTD/twitter*** directory 
- Create a **.env** file
  - Use the **.env.template** file as a template
- Create a **Twitter** developer account
  - The **Twitter** account used for the developer access will be the **Twitter** account posting the Tweets
  - [Applying for Twitter developer access](https://developer.twitter.com/en/apply-for-access)
- Follow the provided steps from **Twitter** to create a **Twitter** project/application
- Verify the **App permissions** contains **Read and Write** access

  ![Read/Write Acess](/twitter/images/read-write-access.PNG)
- Retrieve your project/application **Keys and tokens** by clicking the **Keys and tokens** sections

  ![Keys and tokens](/twitter/images/tokens-section.PNG)
- In the **.env** file, modify the following fields
  - **TWITTER_HANDLE**=***Bot Twitter handle***
  - **WEB_SCRAPER_HOSTNAME**=***Web-Scraper Hostname***
  - **WEB_SCRAPER_PORT**=***Web-Scraper Port***
  - **CONSUMER_KEY**=***Twitter API Key***
  - **CONSUMER_SECRET**=***Twitter API Secret***
  - **ACCESS_TOKEN_KEY**=***Twitter Access Token***
  - **ACCESS_TOKEN_SECRET**=***Twitter Access Secret***
- Open a command link window of choice
  - Command Prompt, GitBash, etc.
- In the ***BlissQOTD/twitter*** directory, execute the following command to start up the bot
  - ***npm start***
- View logs and verify no startup errors appear

## Docker Setup
- Follow the steps indicated above in [Stand-Alone Project Setup](#stand-alone-project-setup) to get the base project setup
- Navigate to the project base directory
- Execute the following command to build the Docker image
  - ***docker build -t twitter .***
- Execute the following command to run the Docker container
  - Interactive process: ***docker run -it twitter***
  - Detached from the process: ***docker run -d --rm twitter***
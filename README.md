# BlissQOTD
This repository contains code for a **Twitter** bot that provides blissful and positive tweets daily.

The goal of the bot is to scrape certain websites and provide blissful and positive tweets from those websites.

**BlissQOTD** is comprised of two **Node.js** servers. The **twitter** server is the **Twitter** side implementation of the bot. The **web-scraper** server is the **web-scraping** side implementation of the bot.

Follow the bot on [Twitter](https://twitter.com/BlissQOTD)

## Quick Links:
- [Requirements](#requirements)
- [Setup](#setup)
- [Startup](#startup)
- [Shutdown](#shutdown)

----------------------------------

## Requirements
- Docker

View the ***twitter*** [Requirements](/twitter/README.md#requirements) and ***web-scraper*** [Requirements](/web-scraper/README.md#requirements) if not running through **Docker**

## Setup
- Clone the repository
- Navigate to the ***BlissQOTD*** directory
- Create a **.env** file
  - Use the **.env.template** file as a template
- In the **.env** file, modify the following field
  - **WEB_SCRAPER_PORT**=***Web-Scraper Port***
- Follow the ***twitter*** [Setup](/twitter/README.md#setup) steps
- Follow the ***web-scraper*** [Setup](/web-scraper/README.md#setup) steps

## Startup
- Navigate to the ***BlissQOTD*** directory
- Execute the following command to build the **Docker** images and startup the containers
  - Interactive process: ***docker-compose up --build***
  - Detached from the process: ***docker-compose up -d --build***
- View logs and verify no startup errors appear

## Shutdown
- Navigate to the ***BlissQOTD*** directory
- Execute the following command to stop the ***Docker*** containers
  - ***docker-compose down***
import axios from "axios";
import cheerio from "cheerio";
import Response from "../../web-api/Response";
import { randomNumber } from "../random/random";
import { EnvironmentKeys } from "../environment-keys/environment-keys";

// Sends request to good reads web page and returns a quote response
export async function goodReadsRequest(env: EnvironmentKeys, charLimit: number): Promise<Response> {
  let currentAttempt = 0;
  const links = [env.GOOD_READS_INSPIRATION_LINK, env.GOOD_READS_INSPIRATIONAL_LINK];
  
  while (currentAttempt < env.MAX_REQUEST_ATTEMPTS) {
    currentAttempt++;
    const randomLink = randomNumber(1);
    const randomPage = randomNumber(99);
    const randomQuote = randomNumber(24);
    const params = {
      params: {
        page: randomPage
      }
    };

    try {
      console.log('-----------------------------------------------------------------------------');
      console.log(`Requesting quote - Attempt ${currentAttempt}`); // `
      console.log(`Link: ${links[randomLink]}`); // `
      console.log(`Page: ${randomPage}`); // `
      console.log('-----------------------------------------------------------------------------');

      // Requests and transforms web request
      const response = await axios.get(links[randomLink], params);
      const $ = cheerio.load(response.data);

      const quotesResponse = $('.quoteText');
      const quoteResponse = quotesResponse[randomQuote].children[0]['data'];
      const authorResponse = quotesResponse[randomQuote].children[3]['children'][0].data

      // Parses DOM response
      const quote = parseResponse(quoteResponse);
      const author = parseResponse(authorResponse);
      const numOfCharacters = quote.length + author.length;

      console.log('-----------------------------------------------------------------------------');
      console.log('Request completed');
      console.log(`Quote: ${quote}`); // `
      console.log(`Author: ${author}`); // `
      console.log('-----------------------------------------------------------------------------');

      if (charLimit !== 0 && numOfCharacters > charLimit) {
        throw new Error(`Quote response larger than character limit of ${charLimit}`); // `
      }

      return {
        quote: quote,
        author: author
      };
    }
    catch (error) {
      console.error('-----------------------------------------------------------------------------');
      console.error('Error caught in good-reads-request.goodReadsRequest');
      console.error(`${error}`); // `
      console.error('-----------------------------------------------------------------------------');
    }
  }
}

// Removes whitespaces on both ends as well as remove ", ' and \n characters
function parseResponse(response: string): string {
  let result = '';
  
  for (const char of response) {
    if (char === ' ' || char.match(/[a-z]/i)) {
      result += char;
    }
  }

  return result.trim();
}
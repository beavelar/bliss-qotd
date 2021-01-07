import Response from "../web-api/Response";
import { goodReadsRequest } from "../util/good-reads/good-reads-request";
import { EnvironmentKeys } from "../util/environment-keys/environment-keys";

// Makes request to desired web page and returns quote response
export async function request(env: EnvironmentKeys): Promise<Response> {
  return goodReadsRequest(env);
}
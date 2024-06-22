import { getToken } from '../../utils/getJwt.mjs';
import {
  generateUploadUrl
} from '../../businessLogic/todos.js';
import { createLogger } from '../../utils/logger.mjs';
const logger = createLogger('generateUploadUrl');
export const handler = async (event) => {
  logger.info('Processing GenerateUploadUrl event...');
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };
  const jwtToken = getToken(event);
  const todoId = event.pathParameters.todoId;
  try {
    const signedUrl = await generateUploadUrl(jwtToken, todoId);
    logger.info(`Successfully created signed url.`);
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ uploadUrl: signedUrl })
    };
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error })
    };
  }

}

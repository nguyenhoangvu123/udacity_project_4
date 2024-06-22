import { getToken } from '../../utils/getJwt.mjs';
import {
  getTodos
} from '../../businessLogic/todos.js';
import { createLogger } from '../../utils/logger.mjs';
const logger = createLogger('getTodos');
export const handler = async (event) => {
  logger.info('Processing GetTodos event...');
  const jwtToken = getToken(event);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };
  try {
    const todoList = await getTodos(jwtToken);
    logger.info('Successfully retrieved todolist');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ todoList })
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

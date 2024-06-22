import { getToken } from '../../utils/getJwt.mjs';
import {
  deleteTodo
} from '../../businessLogic/todos.js';
import { createLogger } from '../../utils/logger.mjs';
const logger = createLogger('deleteTodo');
export const handler = async (event) => {
  logger.info('Processing DeleteTodo event...');
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };
  const jwtToken = getToken(event);
  const todoId = event.pathParameters.todoId;
  try {
    await deleteTodo(jwtToken, todoId);
    logger.info(`Successfully deleted todo item: ${todoId}`);
    return {
      statusCode: 204,
      headers,
      body: undefined
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

import { getToken } from '../../utils/getJwt.mjs';
import {
  updateTodo
} from '../../businessLogic/todos.js';
import { createLogger } from '../../utils/logger.mjs';
const logger = createLogger('updateTodo');
export const handler = async (event) => {
  logger.info('Processing UpdateTodo event...');
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };
  const jwtToken = getToken(event);
  const todoId = event.pathParameters.todoId;
  const updateData = JSON.parse(event.body);
  try {
    await updateTodo(jwtToken, todoId, updateData);
    logger.info(`Successfully updated the todo item: ${todoId}`);
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

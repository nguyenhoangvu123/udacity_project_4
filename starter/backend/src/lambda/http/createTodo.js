import { getToken } from '../../utils/getJwt.mjs';
import {
  createTodo
} from '../../businessLogic/todos.js';
import { createLogger } from '../../utils/logger.mjs';
const logger = createLogger('createTodo');
export const handler = async (event) => {
  logger.info('Processing CreateTodo event...');
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };
  try {
    const jwtToken = getToken(event);
    const newTodoData = JSON.parse(event.body);
    const newTodo = await createTodo(jwtToken, newTodoData);
    logger.info('Successfully created a new todo item.');
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ newTodo })
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


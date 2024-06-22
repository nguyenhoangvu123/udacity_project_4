import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { createLogger } from '../utils/logger.mjs';
const dynamoDBClient = DynamoDBDocument.from(new DynamoDB())
const todosTable = process.env.TODOS_TABLE;
const logger = createLogger('todoAccess');

export async function getTodosData(userId) {
    logger.info('Getting all todo items');
    const result = await dynamoDBClient
        .query({
            TableName: todosTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
    });
    return result.Items;
}

export async function getTodoData(userId, todoId) {
    logger.info(`Getting todo item: ${todoId}`);
    const result = await dynamoDBClient
        .query({
            TableName: todosTable,
            KeyConditionExpression: 'userId = :userId and todoId = :todoId',
            ExpressionAttributeValues: {
                ':userId': userId,
                ':todoId': todoId
            }
        });
    const todoItem = result.Items[0];
    return todoItem;
}

export async function createTodoData(newTodo) {
    logger.info(`Creating new todo item: ${newTodo.todoId}`);
    await dynamoDBClient
        .put({
            TableName: todosTable,
            Item: newTodo
        });
    return newTodo;
}

export async function updateTodoData(userId, todoId, updateData) {
    logger.info(`Updating a todo item: ${todoId}`);
    await dynamoDBClient
        .update({
            TableName: todosTable,
            Key: { userId, todoId },
            ConditionExpression: 'attribute_exists(todoId)',
            UpdateExpression: 'set #n = :n, dueDate = :due, done = :dn',
            ExpressionAttributeNames: { '#n': 'name' },
            ExpressionAttributeValues: {
                ':n': updateData.name,
                ':due': updateData.dueDate,
                ':dn': updateData.done
            }
        });
}

export async function deleteTodoData(userId, todoId) {
    await dynamoDBClient
        .delete({
            TableName: todosTable,
            Key: { userId, todoId }
        });
}

export async function saveImgUrlData(userId, todoId, bucketName) {
    await dynamoDBClient
        .update({
            TableName: todosTable,
            Key: { userId, todoId },
            ConditionExpression: 'attribute_exists(todoId)',
            UpdateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues: {
                ':attachmentUrl': `https://${bucketName}.s3.amazonaws.com/${todoId}`
            }
        });
}
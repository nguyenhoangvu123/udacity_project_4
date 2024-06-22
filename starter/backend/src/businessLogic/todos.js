import {
    getTodosData,
    getTodoData,
    createTodoData,
    updateTodoData,
    deleteTodoData,
    saveImgUrlData
} from '../dataLayer/todosAccess.js';
import * as uuid from 'uuid';
import { getUserId } from '../utils/getJwt.mjs';
import { uploadUrl } from '../fileStorage/attachmentUtils.js';

export async function getTodos(jwtToken) {
    const userId = getUserId(jwtToken);
    return await getTodosData(userId);
}

export async function getTodo(jwtToken, todoId) {
    const userId = getUserId(jwtToken);
    return await getTodoData(userId, todoId);
}

export async function createTodo(jwtToken, newTodoData) {
    const todoId = uuid.v4();
    const userId = getUserId(jwtToken);
    const createdAt = new Date().toISOString();
    const done = false;
    const newTodo = { todoId, userId, createdAt, done, ...newTodoData };
    return await createTodoData(newTodo);
}

export async function updateTodo(
    jwtToken,
    todoId,
    updateData
) {
    const userId = getUserId(jwtToken);
    return await updateTodoData(userId, todoId, updateData);
}

export async function deleteTodo(jwtToken, todoId) {
    const userId = getUserId(jwtToken);
    return await deleteTodoData(userId, todoId);
}

export async function generateUploadUrl(jwtToken, todoId) {
    const userId = getUserId(jwtToken);
    const bucketName = process.env.IMAGES_S3_BUCKET;
    const signedUrl = await uploadUrl(todoId);
    await saveImgUrlData(userId, todoId, bucketName);
    return signedUrl;
}
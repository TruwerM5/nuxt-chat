import { users } from "~/server/placeholder-data";
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {

    const { nickname, password } = await readBody(event);

    if(!nickname || !password) {
        throw createError({
            status: 400,
            message: 'Credentials not provided',
            statusMessage: 'Credentials not provided',
        })
    }

    const user = users.find(user => user.nickname == nickname);
    if(!user) {
        throw createError({
            statusCode: 404,
            message: `User ${nickname} not found`,
            statusMessage: `User ${nickname} not found`,
        })
    };

    if(user.password != password) {
        throw createError({
            statusCode: 403,
            message: 'Invalid password',
            statusMessage: `Invalid password`,
        });
    }

    return { user };

});
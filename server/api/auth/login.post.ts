import { users } from "~/server/placeholder-data";
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {

    const { nickname, password } = await readBody(event);

    const user = users.find(user => user.nickname == nickname);
    if(!user) {
        throw createError({
            statusCode: 404,
            statusMessage: `User ${nickname} not found`,
        })
    };

    if(user.password != password) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Invalid password'
        });
    }

    return { user };

});
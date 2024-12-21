import { users } from "~/server/placeholder-data";
import { createJwtToken } from "~/server/utils/jwt";
import prisma from "~/lib/prisma";
import * as bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {

    const runtimeConfig = useRuntimeConfig();

    const { bodyNickname, bodyPassword } = await readBody(event);

    if(!bodyNickname || !bodyPassword) {
        throw createError({
            statusCode: 400,
            message: 'Credentials not provided',
            statusMessage: 'Credentials not provided',
        })
    }

    // const user = users.find(user => user.nickname == bodyNickname);
    const user = await prisma.user.findFirst({
        where: {
            nickname: bodyNickname,
        }
    });

    if(!user) {
        throw createError({
            statusCode: 404,
            message: `User ${bodyNickname} not found`,
            statusMessage: `User ${bodyNickname} not found`,
        })
    };

    const matchPassword = await bcrypt.compare(bodyPassword, user.password);
    if(!matchPassword) {
        throw createError({
            statusCode: 403,
            message: 'Invalid password',
            statusMessage: `Invalid password`,
        });
    }
    const { password, ...payload } = user;
    console.log(payload);
    const token = createJwtToken(payload);
    setCookie(event, 'jwt', token, {
        httpOnly: true,
    });
    
    return { user: payload };

});
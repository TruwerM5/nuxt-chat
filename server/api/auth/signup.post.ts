import prisma from "~/lib/prisma";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createJwtToken } from "~/server/utils/jwt";
import { Prisma } from "@prisma/client";

type SignUpBody = {
    nickname: string;
    name: string;
    password: string;
}

export default defineEventHandler(async (event) => {

    const runtimeConfig = useRuntimeConfig();
    const body = await readBody<SignUpBody>(event);
    
    if(!body.nickname || !body.password) {
        throw createError({
            statusMessage: 'Credentials not provided.',
            status: 403
        })
    };


    const hash = await bcrypt.hash(body.password, runtimeConfig.saltRounds);


    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                nickname: body.nickname,
                password: hash,
            }
        });
        const {password, ...payload} = user;
        const token = createJwtToken(payload);

        setCookie(event, 'jwt', token, {
            httpOnly: true,
            sameSite: true,
        });
        
        return { user };
    } catch(e: any) {
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code === 'P2002') {
                throw createError({
                    statusMessage: `User ${body.nickname} already exists.`,
                    status: 400,
                    statusCode: 400,
                });
            }
            
        }
        
    }
});
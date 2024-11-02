import prisma from "~/lib/prisma";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type SignUpBody = {
    nickname: string;
    name: string;
    password: string;
}

export default defineEventHandler(async (event) => {

    const runtimeConfig = useRuntimeConfig();
    const body = await readBody<SignUpBody>(event);
    
    if(!body) {
        throw createError({
            message: 'Invalid data',
            status: 400
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
        const token = await jwt.sign(payload, runtimeConfig.JWT_SECRET,{expiresIn: '1m'});
        // setCookie(event, 'jwt', token, {
        //     httpOnly: true,
        //     sameSite: true,
        // });
        console.log(token);
        return { user };
    } catch(e: any) {
        
        throw createError({
            message: 'Server Error' + e.message,
            status: 500
        });
    }
});
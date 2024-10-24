import prisma from "~/lib/prisma";
import * as bcrypt from 'bcrypt';
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
        return {user};
    } catch(e: any) {
        throw createError({
            message: 'Server Error' + e.message,
            status: 500
        });
    }
});
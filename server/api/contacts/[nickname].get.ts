import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    const nickname = event.context.params?.nickname;
    if(!nickname) {
        throw new Error('User not found')
    };
    try {
        return await prisma.user.findUnique({
            where: {
                nickname
            },
            select: {
                avatar: true,
                name: true,
                nickname: true,
            }
        })
    } catch (err: any) {
        console.log('error');
        throw new Error(err.message);
    }
})
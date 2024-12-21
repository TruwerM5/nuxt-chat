// import { contacts } from "~/server/placeholder-data";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {

    const contacts = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            nickname: true,
            avatar: true
        }
    });
    return contacts;
});
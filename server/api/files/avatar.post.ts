import { ServerFile } from "nuxt-file-storage";
import { useCookie } from "nuxt/app";
import prisma from "~/lib/prisma";
import jwt from 'jsonwebtoken';
import type { Contact } from "~/types";
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { files } = await readBody<{files: ServerFile[]}>(event);
    if(!files) {
        throw createError({
            status: 400,
            statusText: 'Image is not provided'
        })
    }
    const token = getCookie(event, 'jwt');
    if(!token) {
        throw createError({
            status: 403,
            message: 'Access denied',
        })
    };

    let payload: any = jwt.verify(token, config.JWT_SECRET);

    if(!payload) {
        throw createError({
            status: 403,
            message: 'Access denied',
        })
    };
    
    let newFile = '';

    for(const file of files) {
        newFile = await storeFileLocally(file, 8, '/contacts');
        
        const { binaryString, ext } = parseDataUrl(file.content);
        
    }

    const user = await prisma.user.update({
        where: {
            id: payload.id,
        },
        data: {
            avatar: newFile,
        }
    })
    
    
    return { user };

});


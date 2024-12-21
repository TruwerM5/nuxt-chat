import jwt from 'jsonwebtoken';

export default defineEventHandler(event => {

    const runtimeConfig = useRuntimeConfig();
    const token = getCookie(event, 'jwt');
    if(!token) {
        throw createError({
            status: 401,
            statusCode: 401,
            message: 'Token is not provided',   
            statusMessage: 'Token is not provided'
        });
    }

    try {
        const user = jwt.verify(token, runtimeConfig.JWT_SECRET);
        
        return { authenticated: true, user };
    } catch(e: any) {
        throw createError({
            statusCode: 401,
            message: 'Invalid token',
        });
    }
});
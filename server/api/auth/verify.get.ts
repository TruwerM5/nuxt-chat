import jwt from 'jsonwebtoken';

export default defineEventHandler(event => {

    const runtimeConfig = useRuntimeConfig();
    const token = getCookie(event, 'jwt');
    if(!token) {
        throw createError({
            status: 401,
            message: 'Token is not provided',
        });
    }

    try {
        const jwtToken = jwt.verify(token, runtimeConfig.JWT_SECRET);
        return {authenticated: true, token: jwtToken};
    } catch(e: any) {
        throw createError({
            statusCode: 401,
            message: 'Invalid token',
        });
    }
});
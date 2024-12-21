
export default defineEventHandler(async (event) => {

    setCookie(event, 'jwt', '', {
        maxAge: -1,
        httpOnly: false,
        sameSite: false,
    });
    return { authenticated: false };
});
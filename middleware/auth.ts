import jwt from 'jsonwebtoken';

export default defineNuxtRouteMiddleware(async (to, from) => {
    
    const {data, error} = await useFetch('/api/auth/verify');
    if(error) {
        return navigateTo('/auth/login');
    }
    
});
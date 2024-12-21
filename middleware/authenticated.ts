export default defineNuxtRouteMiddleware(async (to, from) => {
    const {data, error} = await useFetch('/api/auth/verify');
    
    if(data.value) {
        return navigateTo('/');
    }
})
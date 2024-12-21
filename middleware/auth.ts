
import { useCurrentUserStore } from "#imports";
import type { Contact } from "~/types";

export default defineNuxtRouteMiddleware(async (to, from) => {

    const currentUser = useCurrentUserStore();
    const {data, error} = await useFetch<{user: Contact, authenticated: boolean}>('/api/auth/verify');

    if(error.value) {
        return navigateTo('/auth/login');
    }
    
    if(data.value) {
        
        currentUser.user = data.value.user;
        
    }
    
});
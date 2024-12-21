<script lang="ts" setup>
import { useCurrentUserStore } from '~/stores/current-user';

definePageMeta({
    layout:'auth',
    pageTransition: {
        name: 'auth'
    },
    middleware: 'authenticated' //if user is authenticated navigate to index page
});

const currentUser = useCurrentUserStore();

const loginData = reactive({
    bodyNickname: '',
    bodyPassword: '',
});
const router = useRouter();
const errorMessage = ref('');
const showAlert = ref(false);
const pending = ref(false);

async function login() {
    pending.value = true;
    showAlert.value = false;
    
    try {
        const req = await $fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: loginData,
        });
        if(req.user) {
            currentUser.setCurrentUser(req.user);
            router.push('/');
            
        }
    } catch(e: any) {
        
        errorMessage.value = e.statusMessage;
        showAlert.value = true;

    }
    pending.value = false;

}

</script>

<template>
    <div>
        <form @submit.prevent class="shadow-md rounded-xl p-8 bg-white">
            <h4 class="text-xl font-bold text-center mb-3 md:text-2xl">Log In</h4>
            <p class="text-center md:text-lg mb-6">Don't have an account? 
                <NuxtLink 
                  to="/auth/signup" class="text-primary hover:text-primary-dark transition-colors"
                >
                    Sign Up
                </NuxtLink>
            </p>
            <div class="mb-4 relative">
                <label for="nickname" hidden>Nickname</label>
                <input 
                  type="text" 
                  name="nickname" 
                  id="nickname" 
                  v-model="loginData.bodyNickname"
                  class="bg-zinc-200 py-2 pl-8 rounded-md focus:bg-white peer focus:outline-primary transition-colors"
                  placeholder="Nickname"
                  autocomplete="username"
                />
                <Icon 
                  name="material-symbols:alternate-email" 
                  class="absolute left-2 top-1/2 text-lg -translate-y-1/2 text-zinc-600 peer-focus:text-primary transition-colors" 
                />
            </div>
            <div class="mb-4 relative">
                <label for="password" hidden>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  v-model="loginData.bodyPassword"
                  class="bg-zinc-200 py-2 pl-8 rounded-md focus:bg-white peer focus:outline-primary transition-colors"
                  placeholder="Password"
                  autocomplete="current-password"
                />
                <Icon 
                  name="material-symbols:lock" 
                  class="absolute left-2 top-1/2 text-lg -translate-y-1/2 text-zinc-600 peer-focus:text-primary transition-colors" 
                />
            </div>
            <UiPrimaryButtonVue text="Log In" @click="login" :pending="pending" />
        </form>
        <UiAlertVue v-if="showAlert" :message="errorMessage" :show-alert="showAlert" />
    </div>
</template>
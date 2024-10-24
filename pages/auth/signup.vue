<script lang="ts" setup>
import { validateNickname } from '~/utils/validateNickname';

definePageMeta({
    layout: 'auth',
    pageTransition: {
        name: 'auth'
    }
});

const signUpData = reactive({
    nickname: '',
    name: '',
    password: '',
    
});

const confirmPassword = ref('');

function onNicknameType() {
    signUpData.nickname = validateNickname(signUpData.nickname);
}

async function signUp() {
  try {

    const req = await $fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: signUpData
    });

    if(req.user) {
      return navigateTo('/');
    }

  } catch(e: any) {
    console.log('Error: ', e.message);
  }
}

</script>

<template>
    <div>
        <form @submit.prevent class="shadow-md rounded-xl p-8 bg-white">
            <h4 class="text-xl font-bold text-center mb-3 md:text-2xl">Sign Up</h4>
            <p class="text-center md:text-lg mb-6">Already have an account? 
                <NuxtLink 
                  to="/auth/login" class="text-primary hover:text-primary-dark transition-colors"
                >
                    Login
                </NuxtLink>
            </p>
            <div class="mb-4 relative">
                <label for="nickname" hidden>Nickname</label>
                <input 
                  type="text" 
                  name="nickname" 
                  id="nickname" 
                  v-model="signUpData.nickname"
                  class="bg-zinc-200 py-2 pl-8 rounded-md focus:bg-white peer focus:outline-primary transition-colors"
                  placeholder="Nickname"
                  @change="onNicknameType"
                  autocomplete="email"
                />
                <Icon 
                  name="material-symbols:alternate-email" 
                  class="absolute left-2 top-1/2 text-lg -translate-y-1/2 text-zinc-600 peer-focus:text-primary transition-colors" 
                />
            </div>
            <div class="mb-4 relative">
                <label for="name" hidden>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  v-model="signUpData.name"
                  class="bg-zinc-200 py-2 pl-8 rounded-md focus:bg-white peer focus:outline-primary transition-colors"
                  placeholder="Name"
                  autocomplete="username"
                />
                <Icon 
                  name="material-symbols:person" 
                  class="absolute left-2 top-1/2 text-lg -translate-y-1/2 text-zinc-600 peer-focus:text-primary transition-colors" 
                />
            </div>
            <div class="mb-4 relative">
                <label for="password" hidden>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  v-model="signUpData.password"
                  class="bg-zinc-200 py-2 pl-8 rounded-md focus:bg-white peer focus:outline-primary transition-colors"
                  placeholder="Password"
                  autocomplete="new-password"
                />
                <Icon 
                  name="material-symbols:lock" 
                  class="absolute left-2 top-1/2 text-lg -translate-y-1/2 text-zinc-600 peer-focus:text-primary transition-colors" 
                />
            </div>
            <div class="mb-4 relative">
                <label for="confirm_password" hidden>Confirm Password</label>
                <input 
                  type="password" 
                  name="confirm_password" 
                  id="confirm_password" 
                  v-model="confirmPassword"
                  class="bg-zinc-200 py-2 pl-8 rounded-md focus:bg-white peer focus:outline-primary transition-colors"
                  placeholder="Confirm password"
                  autocomplete="current-password"
                />
                <Icon 
                  name="material-symbols:lock" 
                  class="absolute left-2 top-1/2 text-lg -translate-y-1/2 text-zinc-600 peer-focus:text-primary transition-colors" 
                />
            </div>
            <UiPrimaryButtonVue text="Sign Up" @click="signUp" />
        </form>
    </div>
</template>
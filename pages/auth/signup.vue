<script lang="ts" setup>

import { validateNickname } from '~/utils/validateNickname';
import { validateSignUpData } from '~/utils/validateAuth';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useCurrentUserStore } from '~/stores/current-user';

definePageMeta({
    layout: 'auth',
    pageTransition: {
        name: 'auth'
    },
    middleware: 'authenticated' //if user is authenticated navigate to index page
});
const currentUser = useCurrentUserStore();
const router = useRouter();
const signUpData = reactive({
    nickname: '',
    name: '',
    password: '',
    confirmPassword: ''
});

// const confirmPassword = ref('');
const showAlert = ref(false);
const errorMessage = ref('');

const pending = ref(false);

function onNicknameType() {
    signUpData.nickname = validateNickname(signUpData.nickname);
}

async function signUp() {
  pending.value = true;
  showAlert.value = false;

  try {
    await validateSignUpData(signUpData);
    const req = await $fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: signUpData
    });

    if(req?.user) {
      currentUser.setCurrentUser(req.user.nickname);
      router.push('/');
    }

  } catch(e: any) {
    errorMessage.value = e.statusMessage;
    showAlert.value = true;
  }
  pending.value = false;

}

const schema = {
  username(value: string) {
    if(value && value.trim()) {
      return true;
    }
    return 'This is required';

  },
  password: 'required|min:8'
}

</script>

<template>
    <div>
        <Form @submit="" class="shadow-md rounded-xl p-8 bg-white" :validation-schema="schema">
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
                <Field 
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
                <ErrorMessage name="nickname" />
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
                  v-model="signUpData.confirmPassword"
                  class="bg-zinc-200 py-2 pl-8 rounded-md focus:bg-white peer focus:outline-primary transition-colors"
                  placeholder="Confirm password"
                  autocomplete="current-password"
                />
                <Icon 
                  name="material-symbols:lock" 
                  class="absolute left-2 top-1/2 text-lg -translate-y-1/2 text-zinc-600 peer-focus:text-primary transition-colors" 
                />
            </div>
            <UiPrimaryButtonVue text="Sign Up" @click="signUp" :pending="pending" />
        </Form>
        <UiAlertVue v-if="showAlert" :message="errorMessage" :show-alert="showAlert" />
    </div>
</template>
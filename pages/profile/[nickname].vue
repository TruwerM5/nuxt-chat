<script setup lang="ts">
import { useCurrentUserStore } from '#imports';
useHead({
    title: 'Profile'
})

definePageMeta({
    middleware: 'auth',
    pageTransition: false,
});

const currentUser = useCurrentUserStore();
const route = useRoute();
const pending = ref(false);
const file = ref<any>(null);
const imageUrl = ref('');
const { handleFileInput, files } = useFileStorage({clearOldFiles: false});

const submit = async () => {
    pending.value = true;
    const response = await $fetch('/api/files/avatar', {
        method: 'POST',
        body: {
            files: files.value,
        }
    });
    currentUser.setCurrentUser(response.user);
    pending.value = false;
};

function onFileChange(e: any) {
    file.value = e.target.files[0];
    imageUrl.value = URL.createObjectURL(e.target.files[0]);
}

</script>

<template>
    <div class="h-full w-full grid grid-rows-10 px-4 py-2">
        <div class="flex justify-between items-center row-span-1">
            <h3 class="text-2xl lg:text-3xl">Profile</h3>
            <UiOpenSideNavButtonVue>
                <template #text>
                    Back
                </template>
            </UiOpenSideNavButtonVue>
        </div>
        <div class="h-full w-full row-span-9 flex flex-col gap-4">
            <div class="relative w-[240px] h-[240px] rounded-full bg-zinc-500 mx-auto flex justify-center items-center overflow-hidden">
                
                <template v-if="imageUrl">
                    <div>
                        <img :src="imageUrl" alt="avatar" class="w-full h-full object-cover">
                    </div>
                </template>
                <template v-else-if="currentUser.user.avatar">
                    <div>
                        <img :src="'/contacts/'+currentUser.user.avatar" alt="Avatar" />
                    </div>
                </template>
                <template v-else>
                    <span class="text-[60px] text-zinc-100">{{ currentUser.user.name?.slice(0, 1) }}</span>
                </template>
                <div class="absolute w-full h-full left-0 rounded-full flex justify-center items-center transition-all opacity-0 hover:bg-zinc-700 hover:opacity-100 cursor-pointer">
                    <input 
                        type="file" 
                        class="absolute opacity-0 w-full h-full" 
                        @input="handleFileInput" 
                        @change="onFileChange"
                    />
                    <Icon name="material-symbols:add-a-photo" class="text-white text-[70px]" />
                </div>
                
                
            </div>
            <template v-if="imageUrl">
                <UiPrimaryButtonVue  @click="submit" :text="'Submit'" :pending="pending" class="m-0" />
                <button @click="imageUrl = ''">Cancel</button>
            </template>
            
            <p class="text-center text-2xl">{{ currentUser.user.name }}</p>
            <p class="text-center text-xl">{{ currentUser.user.nickname }}</p>
        </div>
    </div>
</template>
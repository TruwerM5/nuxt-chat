<script lang="ts" setup>
import type { Contact } from '~/types';
import { toggleNav } from '~/stores/useNavStore';

const props = defineProps<{contact: Contact}>();


</script>

<template>
    <div class="absolute top-0 left-0 w-full bg-white z-10 p-2 md:p-3 flex items-center gap-4 border-b border-solid border-zinc-600">
        <img 
            :src="`${contact.avatar}`" 
            :alt="contact.name"
            class="h-[50px] w-[50px] rounded-full object-cover object-center md:h-[80px] md:w-[80px]" 
        />
        <div class="flex flex-col">
            <p class="text-xl md:text-3xl">{{ contact.name }}</p>
            <p class="text-sm md:text-base text-zinc-600">{{ contact.nickname }}</p>
        </div>
        <div class="ml-auto">
            <UiOpenSideNavButtonVue>
                <template #text>
                    Back
                </template>
            </UiOpenSideNavButtonVue>
        </div>
    </div>
</template>
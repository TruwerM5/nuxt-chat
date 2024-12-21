<script setup lang="ts">
import type { Contact } from '~/types';


const props = defineProps<{ contact: Contact }>();

</script>

<template>
    <li class="p-3 border-b border-solid border-zinc-600 hover:bg-zinc-200">
        <NuxtLink 
            :to="{path: `/contacts/${contact.nickname}`}"
            
            class="flex items-center gap-2"
        >
            <img
                v-if="contact.avatar"
                :src="`/contacts/${contact.avatar}`" 
                :alt="contact.name"
                width="50"
                height="50"
                class="rounded-full object-cover object-center w-[50px] h-[50px]" 
                
            />
            <div v-else class="w-[50px] h-[50px] bg-zinc-500 rounded-full flex justify-center items-center">
                <span class="text-zinc-200 font-bold text-2xl">{{ contact.name.slice(0, 1) }}</span>
            </div>
            <span class="flex flex-col relative overflow-hidden">
                <p class="text-lg whitespace-pre overflow-ellipsis">{{ contact.name }}</p>
                <p class="text-zinc-600 text-sm">{{ contact.nickname }}</p>
            </span>
        </NuxtLink>
    </li>
</template>
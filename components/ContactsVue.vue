<script lang="ts" setup>
import type { Contact } from '~/types';
import { authUserNickname } from '~/constants';

const emits = defineEmits(['hide-nav']);
const searchString = ref('');
const contacts = ref<Contact[] | null>([]);
const filteredContacts = ref<Contact[]>([]);
const { data } = await useFetch<Contact[]>(`/api/contacts?exclude=${authUserNickname}`);
if(data.value) {
    contacts.value = data.value;
    filteredContacts.value = contacts.value;
}
function onChange() {
    if(!contacts.value) return;

    if(!searchString.value.length) {
        filteredContacts.value = contacts.value;
        return;
    }

    
    filteredContacts.value = contacts.value
    .filter(contact => 
    contact.name.toLowerCase().includes(searchString.value.toLowerCase()
    ));
    
}

</script>

<template>
    <div>
        <div class="relative mx-3">
            <label for="search_contact" aria-hidden="true" class="hidden">Search contact</label>
            <input 
            type="text" 
            name="search_contact" 
            id="search_contacct" 
            class="w-full p-2 pl-10 my-6 bg-zinc-200 peer focus:outline-primary focus:bg-white transition-colors rounded-md"
            placeholder="Search..."
            v-model="searchString"
            @keyup="onChange"
            />
            <Icon name="material-symbols:search" class="absolute text-2xl top-1/2 left-2 text-zinc-500 transition-colors -translate-y-1/2 peer-focus:text-primary " />
        </div>
        
        <ul v-if="filteredContacts.length > 0"
            class="flex flex-col"
        >
            <li  
              v-for="contact in filteredContacts" :key="contact.id"
              class="p-3 border-b border-solid border-zinc-600 hover:bg-zinc-200"
            >
                <NuxtLink 
                  :to="{path: `/contacts/${contact.nickname}`}"
                  @click="$emit('hide-nav')"
                  class="flex items-center gap-2"
                >
                <img
                    :src="`${contact.avatar}`" 
                    :alt="contact.name"
                    width="50"
                    height="50"
                    class="rounded-full object-cover object-center w-[50px] h-[50px]" 
                    
                />
                    <span class="flex flex-col relative overflow-hidden">
                        <p class="text-lg whitespace-pre overflow-ellipsis">{{ contact.name }}</p>
                        <p class="text-zinc-600 text-sm">{{ contact.nickname }}</p>
                    </span>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>
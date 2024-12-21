<script lang="ts" setup>
import type { Contact } from '~/types';
import { useCurrentUserStore } from '~/stores/current-user';


const emits = defineEmits(['hide-nav']);
const currentUser = useCurrentUserStore();
const searchString = ref('');
const contacts = ref<Contact[] | null>([]);

const { data } = await useFetch<Contact[]>(`/api/contacts`);
const filteredContacts = ref<Contact[]>([]); 
if(data.value) {
    contacts.value = data.value;
    filteredContacts.value = contacts.value.filter(item => item.nickname != currentUser.user.nickname);
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
            <UiContactItemVue 
                v-for="contact in filteredContacts" 
                :contact="contact" 
                :key="contact.id" 
                @click="$emit('hide-nav')"
            />
        </ul>
    </div>
</template>
<script lang="ts" setup>
import type { Contact, Message } from '~/types';
import ConnectionClient from '~/components/Connection.client.vue';
import ContactInfoVueClient from '~/components/ContactInfoVue.vue';

const route = useRoute();
const nickname = computed(() => route.params.nickname);
const contact = ref<Contact | null>();


const { data } = await useFetch<Contact>(`/api/contacts/${nickname.value}`);
const from_user_nickname = '@zabit';
const messageUrl = `/api/messages/messages?from=${from_user_nickname}&to=${nickname.value}`;
const {data: messages} = await useFetch<Message[]>(messageUrl);
if(data) {
    contact.value = data.value;
}

</script>

<template>
    <div class="h-screen overflow-hidden relative">
        <div v-if="contact" class="row-span-1">
        <ContactInfoVue :contact="contact" />
        </div>
        <!-- <ConnectionClient /> -->
        <div class="h-full">
            
                <ChatVue :messages="messages || []" :user_nickname="from_user_nickname" />
           
           
                
           
            
        </div>
        
    </div>
</template>
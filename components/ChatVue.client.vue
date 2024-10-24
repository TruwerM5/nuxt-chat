<script lang="ts" setup>

import { websocketUrl } from '~/constants';
import type { Message } from '~/types';
import { getTimeFromIsoString } from '~/utils/getTime';

const props = defineProps<{messages: Message[] | [], user_nickname: string}>();
const messages = ref<Message[]>([]);
const message = ref('');
const messagesRef = useTemplateRef('messageRef');
const textareaRef = useTemplateRef('textareaRef');

let ws = new WebSocket(websocketUrl);
ws.addEventListener('open', (event) => {
    console.log('Connected...', event);
});
ws.addEventListener('message', async (event) => {
  // const message = await event.data.json().message;
  const data = await event.data.text();
  const json = JSON.parse(data);
  if(json.message) {
    messages.value.push(json.message);
    scrollMessages();
  } 
});

messages.value = props.messages;

async function sendMessage() {
  
  
  if(!message.value) {
    console.log('Type a message');
    return;
  }

  let msgObject: Message = {
    from_user_nickname: '@zabit',
    to_user_nickname: '@thenotorious',
    id: 22,
    message: message.value,
    date: new Date().toISOString()
  }

  ws.send(JSON.stringify(msgObject));
  

  const req = await $fetch('/api/messages/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      message: message.value,
    },
    params: {
      from: props.user_nickname,
      to: '@thenotorious'
    }
  });
  
  if(req.newMessage) {
    messages.value.push(req.newMessage);
    message.value = '';
    
    scrollMessages();
    resizeTextarea();
  }
  
}

onMounted(() => {
  scrollMessages();
});

function scrollMessages() {
  nextTick(() => {
    if(messagesRef.value) {
      messagesRef.value.scrollTo(0, messagesRef.value.scrollHeight);
    }
  })
}

function resizeTextarea() {
  if(!textareaRef.value) {
    return
  }

  if(!message.value) {
    textareaRef.value.style.maxHeight = '44px';
    return;  
  }
  
  textareaRef.value.style.maxHeight = textareaRef.value.scrollHeight + 'px';
  textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
  
  
    
}

</script>

<template>
    <div class="relative h-full">

      <div v-if="messages.length > 0" class="messages relative max-h-full overflow-scroll scroll-smooth" ref="messageRef">
        <div class="px-12 py-[110px] ">
          <TransitionGroup name="chat">
            <div
            v-for="message in messages" :key="message.id"
            :class="['max-w-[40%] bg-zinc-700 py-2 px-4 text-white w-fit rounded-md message mb-4 break-all',
              {
                'message_from ml-auto': message.from_user_nickname == user_nickname,
                'message_to mr-auto': message.from_user_nickname != user_nickname
              }
            ]"
          >
              <p class="text-lg">{{ message.message }}</p>
              <p class="w-fit ml-auto">{{ getTimeFromIsoString(message.date) }}</p>
            </div>
          </TransitionGroup>
          
        </div>
        
      </div>
      <div v-else class="grid items-center justify-center h-full">
        <p class="text-3xl">No messages...</p>
      </div>
        
        <div class="absolute bottom-0 left-0 bg-white max-h-[200px]
        flex items-center gap-2 w-full border-t border-solid border-zinc-800 px-2 pt-2 pb-6">
        <div class="relative flex-1 h-[44px]">
          <label for="new_message" aria-hidden="true" class="hidden">New message</label>
          <textarea
            name="new_message" 
            id="new_message" 
            v-model="message"
            placeholder="New message"
            class="chat-textarea pl-12 p-2 rounded-md w-full
            bg-zinc-200 text-lg focus:outline-primary 
            focus:bg-white transition-colors peer h-full"
            ref="textareaRef"
            @keydown="resizeTextarea"
          ></textarea>
          <Icon 
            name="material-symbols:mail" 
            class="absolute left-2 top-1/2 -translate-y-1/2 
            text-zinc-500 peer-focus:text-primary transition-colors text-2xl" 
          />
        </div>
          
          <button 
            type="button" 
            @click="sendMessage"
            class="min-w-[56px] bg-primary flex items-center h-full justify-center 
            text-white text-center rounded-md py-2 px-4 font-bold
            transition-colors duration-300 hover:bg-primary-dark md:w-[130px] min-h-[44px]"
            :class="{'bg-zinc-400 hover:bg-zinc-400 cursor-auto': message.length == 0}"
          >
            <Transition name="icons">
                <Icon v-if="message.length > 0" name="material-symbols:send-rounded" class="text-2xl"/>
                <Icon v-else name="uiw:stop-o"  class="text-2xl" />
            </Transition>
            
          </button>
        </div>
    </div>
</template>
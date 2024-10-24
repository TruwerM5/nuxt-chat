<script lang="ts" setup>
import { websocketUrl } from './constants';


const store = reactive<any>({
      message: '',
      messages: [],
});

let ws: WebSocket;

const connect = async () => {

    // if(import.meta.client) {
        ws.addEventListener('open', (event) => {
            console.log('Connected...', event);
        });
                
    // }
}

// const sendMessage = async () => {
//     ws.send(JSON.stringify({
//         from_nickname: '@zabit',
//         to_nickname: '@thenotorious',
//         message_id: 10,
//         message: 'Hi Bitch'
//     }));
// }


onMounted(async () => {
  

//   if(import.meta.client) {
      ws = new WebSocket(websocketUrl);
//   }

  await connect();
  setTimeout(async () => {
    // await sendMessage();
    ws.addEventListener('message', async (event) => {
        
        console.log(event.data);
    
    })
  }, 1000);

  
})

</script>


<template>
  <NuxtLayout />
</template>

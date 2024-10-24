<script lang="ts" setup>    
import { websocketUrl } from '~/constants';
let ws: WebSocket;

if(import.meta.client) {
    ws = new WebSocket(websocketUrl);
}



const store = reactive<any>({
    message: '',
    messages: [],
});


const connect = async () => {

    if(import.meta.client) {
        ws.addEventListener('open', (event) => {
            console.log('Connected...')
        });
                
    }
}


await connect();

</script>

<template>

    <div>
        
    </div>
</template>
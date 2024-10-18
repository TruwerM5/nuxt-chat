<script lang="ts" setup>    

let ws: WebSocket;

if(import.meta.client) {
    ws = new WebSocket('ws://localhost:3000/_ws');
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
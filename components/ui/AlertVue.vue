<script lang="ts" setup>

const props = defineProps<{ 
    message: string; 
    status: 'success' | 'error'; 
    showAlert: boolean;
}>();

const isActive = ref(props.showAlert);
const progressBar = ref(0);
const timerId = ref<any>(null);

function startAlert() {
    isActive.value = true;
    progressBar.value = 0;
    if(timerId.value) {
        clearInterval(timerId.value);
    }
    timerId.value = setInterval(() => {
    progressBar.value += 1;
        if(progressBar.value == 100) {
            clearInterval(timerId.value);
            isActive.value = false;
        }
    }, 50);
}

onMounted(() => {
    if(props.showAlert) {
        startAlert();
    }
});



</script>

<template>
    <div 
      v-show="showAlert" 
      class="fixed bottom-4 right-4 w-[300px] p-2 h-[75px] bg-white rounded-md overflow-hidden"
    >
    
        <button 
          @click="isActive = false"
          class="absolute right-2 top-2"
        >
            <Icon name="material-symbols:close-small-rounded" class="text-primary"/>
        </button>
        <div 
          :class="['h-[4px] transition-all w-0 ease-linear rounded-md', status == 'error' ? 'bg-red-500' : 'bg-primary']" 
          :style="{width: progressBar + '%'}"
        ></div>
        <p 
          :class="[status == 'error' ? 'text-red-500' : 'text-primary']"
        >
          {{ message }}
        </p>
        
    </div>
</template>
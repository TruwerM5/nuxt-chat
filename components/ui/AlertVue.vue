<script lang="ts" setup>

const props = defineProps<{ 
    message: string; 
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
  if(timerId.value) {
    clearInterval(timerId.value);
  }
  isActive.value = props.showAlert;
  progressBar.value = 0;
  timerId.value = null;
  console.log('Mounted');
  if(isActive.value) {
    startAlert();
  }
    
});


</script>

<template>
    <div
      v-if="isActive"
      class="fixed top-4 right-4 w-[300px] p-4 h-[75px] bg-white rounded-md overflow-hidden shadow-md"
    >
        <button 
          @click="isActive = false"
          class="absolute right-2 top-2"
        >
            <Icon name="material-symbols:close-small-rounded" class="text-red-500 text-2xl"/>
        </button>
        <div 
          class="absolute bottom-2 left-0 h-[4px] transition-all w-0 ease-linear rounded-md bg-red-500" 
          :style="{width: progressBar + '%'}"
        ></div>
        <p 
          class="text-red-500 text-xl"
        >
          {{ message }}
        </p>
    </div>
</template>
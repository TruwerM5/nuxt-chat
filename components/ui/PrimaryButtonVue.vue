
<script lang="ts" setup>

defineProps<{text: string}>()

</script>

<template>
    <button 
      class="block mt-6 bg-primary text-white hover:bg-primary-dark 
      rounded-md py-2 px-6 font-bold mx-auto md:text-lg transition-colors
      focus:bg-primary-dark focus:outline-black"
    >
        {{ text }}
    </button>
</template>
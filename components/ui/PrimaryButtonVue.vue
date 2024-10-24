
<script lang="ts" setup>

defineProps<{text: string}>()

</script>

<template>
    <button 
      class="block mt-6 bg-primary text-white hover:bg-primary-dark transition-colors rounded-md py-2 px-6 font-bold mx-auto md:text-lg"
    >
        {{ text }}
    </button>
</template>
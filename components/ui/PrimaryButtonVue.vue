
<script lang="ts" setup>

defineProps<{
  text: string;
  pending?: boolean;
}>()

</script>

<template>
    <button 
      class="h-[44px] w-[100px] mt-6 flex items-center justify-center 
      bg-primary text-white hover:bg-primary-dark 
      rounded-md font-bold mx-auto md:text-lg transition-colors
      focus:bg-primary-dark focus:outline-black"
    >
        <template v-if="pending">
          <Icon name="line-md:loading-twotone-loop" class="text-3xl font-bold" />
        </template>
        <template v-else>
          {{ text }}
        </template>
        
    </button>
</template>
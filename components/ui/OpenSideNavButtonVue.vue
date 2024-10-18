<script lang="ts" setup>
import { toggleNav } from '~/stores/useNavStore';

</script>

<template>
    <button 
      @click="toggleNav"
      class="text-zinc-800 flex items-center transition-colors hover:text-primary md:hidden">
        <Icon name="material-symbols:arrow-back-ios-rounded" />
        <span>
            <slot name="text"></slot>
        </span>
    </button>
</template>
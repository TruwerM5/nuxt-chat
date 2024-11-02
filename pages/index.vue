<script lang="ts" setup>

import { useNavStore, toggleNav } from '~/stores/useNavStore';

definePageMeta({
    middleware: 'auth',
});

</script>

<template>
    <div class="grid items-center justify-center h-full relative">
        <div class="md:hidden absolute top-2 left-2">
            <UiOpenSideNavButtonVue>
                <template #text>
                    Contacts
                </template>
            </UiOpenSideNavButtonVue>
        </div>
        <h3 class="text-3xl">Select chat, please...</h3>
    </div>
</template>
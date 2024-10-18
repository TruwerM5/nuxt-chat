<script lang="ts" setup>

import SideNavVue from '~/components/SideNavVue.vue';

</script>


<template>
    <Html class="font-inter antialiased h-full overflow-y-hidden" lang="ru">
        <Body class="h-full">
            <div class="h-full grid grid-rows-10 grid-cols-1 md:grid-cols-8 md:grid-rows-1">
                <SideNavVue />
                <main class="col-span-1 row-span-9 md:col-span-6">
                    <NuxtPage />
                </main>
            </div>
            
        </Body>
    </Html>
</template>
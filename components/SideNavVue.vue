<script lang="ts" setup>
import ContactsVue from './ContactsVue.vue';
import { toggleNav, useNavStore } from '~/stores/useNavStore';

const isActive = useNavStore();


</script>

<template>
    <header 
      :class="['absolute overflow-hidden w-full h-full z-40 bg-white md:block md:relative md:col-span-2 border-b border-solid border-zinc-800 md:border-r md:border-b-0',
        isActive ? 'block' : 'hidden'
      ]"
    >
        <nav class="p-3 flex justify-between items-center h-full max-h-[70px] md:h-auto">
            <NuxtLink 
              to="/" 
              class="h-full md:h-auto w-fit flex items-center gap-4"
              @click="toggleNav"
            >
                <Icon name="vscode-icons:file-type-nuxt" class="text-[25px] md:text-[40px]" />
                <span class="font-public text-xl md:text-3xl text-primary font-semibold transition-all">Nuxt Chat</span>
            </NuxtLink>
            <button 
              @click="toggleNav"
              class="w-[25px] h-[25px] flex flex-col justify-around relative md:hidden"
            >
                <span
                  v-for="line,i in 2" :key="i"
                  :class="['block h-[2px] w-full rounded-md bg-zinc-700 nav-btn__line', {
                    'nav-btn__line_1': i == 0,
                    'nav-btn__line_2': i == 1,
                    'active': isActive
                  }]"
                >
                </span>
            </button>
        </nav>
        <ContactsVue 
          :class="['bg-white absolute w-full top-[70px] z-10 md:block', isActive ? 'block' : 'hidden']" 
          @hide-nav="toggleNav"
        />
        <NuxtLink 
          to="/auth/signup" 
          class="absolute w-full bottom-4 left-4 text-primary flex items-center justify-center gap-2 text-xl transition-colors hover:text-primary-dark"
        >
          Log Out
          <Icon name="material-symbols:login" class="text-2xl" />
        </NuxtLink>
    </header>
</template>
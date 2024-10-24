<template>
    <div class="h-screen flex items-center justify-center bg-zinc-100 font-inter antialiased">
        <NuxtPage />
    </div>
</template>

<style>
.auth-enter-active,
.auth-leave-active {
    transition: all 0.4s ease-in-out;
}

.auth-enter-from {
    opacity: 0;
    transform: scale(1.2);
}
.auth-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
</style>
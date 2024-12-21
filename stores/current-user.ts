import { defineStore } from "pinia";
import type { Contact } from "~/types";
export const useCurrentUserStore = defineStore('current-user', {
    state: () => {
        return {
            user: {
                id: <number | null>(null),
                nickname: <string | null>(null),
                name: <string | null>(null),
                avatar: <string | null>(null),
            }
        }
    },
    actions: {
        setCurrentUser(user: Contact) {
            this.user = user;
        }
    }
})
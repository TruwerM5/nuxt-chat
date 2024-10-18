import type { Contact, Message } from "~/types"

export const contacts: Contact[] = [
    {
        id: 1,
        nickname: '@thenotorious',
        name: 'Conor McGregor',
        avatar: '/contacts/conor-mcgregor.jpg'
    },{
        id: 2,
        nickname: '@brucelee',
        name: 'Bruce Lee',
        avatar: '/contacts/bruce-lee.png'
    },{
        id: 3,
        nickname: '@jonbones',
        name: 'Jon Jones',
        avatar: '/contacts/jon-jones.jpg'
    },{
        id: 4,
        nickname: '@zabit',
        name: 'Zabit Magomedsharipov',
        avatar: '/contacts/zabit-magomedsharipov.jpg'
    },
];

export const messages: Message[] = [
    {
        id: 1,
        from_user_nickname: '@zabit',
        to_user_nickname: '@thenotorious',
        message: 'Hi. What`s up?',
        date: new Date(2024, 9, 17, 20, 3, 0).toISOString(),
    },{
        id: 2,
        from_user_nickname: '@thenotorious',
        to_user_nickname: '@zabit',
        message: 'How are you doing bro?',
        date: new Date(2024, 9, 17, 20, 5, 0).toISOString(),
    }
];
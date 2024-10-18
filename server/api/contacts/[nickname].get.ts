import { contacts } from "../../placeholder-data";


export default defineEventHandler(async (event) => {
    const nickname = event.context.params?.nickname;
    if(!nickname) {
        throw new Error('User not found')
    };
    try {
        return await contacts.find(contact => contact.nickname == nickname);
    } catch (err: any) {
        console.log('error');
        throw new Error(err.message);
    }
})
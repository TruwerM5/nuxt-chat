import { messages } from "~/server/placeholder-data";
import { Message } from "~/types";

export default defineEventHandler(async (event) => {

    const { message } = await readBody(event);
    const { from, to }: {from: string, to: string} = getQuery(event);

    const newMessage: Message = {
        id: 10,
        from_user_nickname: from,
        to_user_nickname: to,
        message,
        date: new Date().toISOString()
    } 

    try {
        await messages.push(newMessage);
        
        return { newMessage };
    } catch (err: any) {
        console.log('Error');
        throw new Error('Server error ', err.message);
    }

});

import { messages } from "~/server/placeholder-data";

export default defineEventHandler(async (event) => {

    const {from, to} = getQuery(event);

    

    await new Promise((resolve, reject) => {
        setTimeout(() => resolve('done'), 3000);
    });

    return await messages.filter(message => 
        (message.from_user_nickname == from && message.to_user_nickname == to) ||
        (message.from_user_nickname == to && message.to_user_nickname == from)
    );

});
import { contacts } from "~/server/placeholder-data";

export default defineEventHandler(async (event) => {

    const {exclude} = getQuery(event);

    

    if(exclude) {
        return await contacts.filter(contact => 
            contact.nickname != exclude
        );
    }

    return await contacts;

});
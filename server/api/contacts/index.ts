import { contacts } from "~/server/placeholder-data";

export default defineEventHandler(async (event) => {

    return await contacts;

});

export function getTimeFromIsoString(date: string) {
    
    const newDate = new Date(date);
    let hours: string | number = newDate.getHours();
    let minutes: string | number = newDate.getMinutes();
    if(hours < 10) {
        hours = '0' + hours;
    }
    if(minutes < 10) {
        minutes = '0' + minutes;
    }
    return `${hours}:${minutes}`;
}
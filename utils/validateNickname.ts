export function validateNickname(nickname: string) {
    
    if(nickname.startsWith('@')) {
        return nickname;
    };

    if(!nickname) {
        return '';
    }
    
    return '@' + nickname;
}
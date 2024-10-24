export type Contact = {
    id: number;
    nickname: string;
    name: string;
    avatar?: string;
};

export type Message = {
    id: number;
    from_user_nickname: string;
    to_user_nickname: string;
    message: string;
    date: string;
};

export type User = Contact & {
    password: string;
    messages?: Message[];
};
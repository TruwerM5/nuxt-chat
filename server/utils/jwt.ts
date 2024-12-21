import jwt from 'jsonwebtoken';

type payload = {
    id: number;
    nickname: string;
    name: string;
};

const runtimeConfig = useRuntimeConfig();
const expiresIn = '30m';

export function createJwtToken(payload: payload) {
    
    const token = jwt.sign(payload, runtimeConfig.JWT_SECRET, { expiresIn });
    return token;
}
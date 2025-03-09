import { sign, verify, decode } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "Tokenprueba";
enum JWT_TIME {
    LIMIT,
    UNLIMIT
}

export const generateTokenLimitTime = async (email: string, nombres: string, id: number) => {
    const jwt = await sign({ id, email, nombres, limit: JWT_TIME.LIMIT }, JWT_SECRET, { expiresIn: "2h" });
    return jwt;
};

export const generateTokenUnlimitTime = async (email: string, nombres: string, id: number) => {
    const jwt = await sign({ id, email, nombres, limit: JWT_TIME.UNLIMIT }, JWT_SECRET);
    return jwt;
};


export const verifyToken = (jwt: string) => {
    const isCorrect = verify(jwt, JWT_SECRET);
    return isCorrect;
};

export const getUserToken = (jwt: string) => {
    let getUser = decode(jwt)
    return getUser
}

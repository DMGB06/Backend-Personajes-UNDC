import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { getUsuario } from "../services/usuario.srv";
import { RolUsuario } from "@prisma/client";

export const rolRequired = (role: RolUsuario) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const jwtBearer = req.headers.authorization || "";
            const jwt = jwtBearer.split(" ").pop();
            const isUser = verifyToken(`${jwt}`) as { id: number, email: string, nombres: string };
            const { rol } = await getUsuario(isUser.id);

            if (rol === role) {
                next();
            } else {
                res.status(401).send({ statusCode: 401, msg: "NO_AUTHORIZED" });
            }
        } catch (error) {
            res.status(401).send({ statusCode: 401, msg: "SESSION_NO_VALID" });
        }
    }
};

import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";

const ValidateSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtBearer = req.headers.authorization || "";
    const jwt = jwtBearer.split(" ").pop();
    const isUser = verifyToken(`${jwt}`) as { id: number, email: string, nombres: string };
    if (!isUser) { res.status(401).send({ statusCode: 401, msg: "JWT_NO_VALID" }); return }
    req.body.idUsuario = isUser.id;
    next();
  } catch (error) {
    res.status(401).send({ statusCode: 401, msg: "SESSION_NO_VALID" });
    return
  }
};
export { ValidateSession };

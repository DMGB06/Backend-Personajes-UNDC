import { PrismaClient, Usuario } from "@prisma/client";
const prisma = new PrismaClient();
import { encrypt, verified } from "../utils/bcrypt.handle";
import {
  verifyToken,
  generateTokenLimitTime,
  getUserToken,
} from "../utils/jwt.handle";
import { getUsuario } from "./usuario.srv";

export const refreshTokenLimit = async (token: string) => {
  let isValidToken = await verifyToken(token);
  if (!isValidToken) return "TOKEN_NO_VALID";

  let { id } = (await getUserToken(token)) as Usuario;
  const usuario = await getUsuario(id); // 
  if (!usuario?.email) return "NOT_FOUND_USER";

  const newToken = await generateTokenLimitTime(
    usuario.email,
    usuario.nombres,
    usuario.id
  );

  // Ahora sí devolvemos el rol en la respuesta 🔥
  return {
    id: usuario.id,
    nombres: usuario.nombres,
    email: usuario.email,
    rol: usuario.rol,
    token: newToken,
  };
};

export const loginUser = async ({ email, password }: Usuario) => {
  const user = await prisma.usuario.findFirst({
    where: { email },
    select: {
      id: true,
      nombres: true,
      email: true,
      rol: true, // 🔥 Asegurar que `rol` esté incluido
      password: true,
    },
  });

  if (!user?.id) return;
  const passwordHash = user.password;
  const isCorrect = await verified(password, passwordHash);
  if (!isCorrect) return;

  const token = await generateTokenLimitTime(user.email, user.nombres, user.id);

  console.log("🟢 Usuario en backend (antes de enviar al frontend):", user); // Debug

  return {
    id: user.id,
    nombres: user.nombres,
    email: user.email,
    rol: user.rol, // 🔥 Asegurar que `rol` no sea undefined
    token,
  };
};

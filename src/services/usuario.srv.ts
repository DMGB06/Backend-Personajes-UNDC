import { PrismaClient, Usuario } from "@prisma/client";
import { encrypt } from "../utils/bcrypt.handle";

const prisma = new PrismaClient();
export const registerUsuario = async ({
    email,
    password,
    nombres
}: Usuario) => {
    const checkIs = await prisma.usuario.findFirst({
        where: { email },
    });
    if (checkIs?.email) return "ALREADY EXIST";
    const passHash = await encrypt(password);
    const response = await prisma.usuario.create({
        select: {
            id: true,
            email: true,
            nombres: true,
            rol: true,
        },
        data: {
            email,
            nombres,
            password: passHash,
        }
    });
    return response
};
export const updateUsuario = async ({
    id,
    nombres,
    email,
    rol
  }: Partial<Usuario> & { id: number }) => {
  
    const checkIs = await prisma.usuario.findFirst({
      where: { id },
    });
  
    if (!checkIs) return "NO_EXISTE";
  
    // Solo incluye en dataToUpdate los campos que realmente estén presentes
    const dataToUpdate: any = {};
    if (nombres) dataToUpdate.nombres = nombres;
    if (email) dataToUpdate.email = email;
    if (rol) dataToUpdate.rol = rol;
  
    // Si no hay nada que actualizar
    if (Object.keys(dataToUpdate).length === 0) {
      return "NO_CHANGES";
    }
  
    const response = await prisma.usuario.update({
      where: { id },
      data: dataToUpdate,
      select: {
        id: true,
        nombres: true,
        email: true,
        rol: true,
      }
    });
  
    return response;
  };
  


export const getListUsuario = async () => {
    return await prisma.usuario.findMany()
};

export const getUsuario = async (id: number) => {

    const Usuario = await prisma.usuario.findFirst({
        where: {
            id
        },
    });
    if (!Usuario) return

    return Usuario
};

export const getSearchUsuario = async (nombres: string) => {
    const response = await prisma.usuario.findMany({
        where: {
            nombres
        }
    });

    return response;
};

export const deleteUsuario = async (id: number) => {
    
    const response = await prisma.usuario.delete({
        where: {
            id
        }
    })
    return response;
};

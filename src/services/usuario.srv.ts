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
}: Usuario) => {

    const checkIs = await prisma.usuario.findFirst({
        where: { id },
    });

    if (!checkIs) return "NO_EXISTE";

    // Construimos el objeto `dataToUpdate` SIN el campo `password`
    const dataToUpdate: any = {
        nombres,
        email,
        rol
    };

    const response = await prisma.usuario.update({
        where: { id },
        data: dataToUpdate
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

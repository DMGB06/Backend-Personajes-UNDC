import { PrismaClient, Personaje } from "@prisma/client";
const prisma = new PrismaClient();

export const createPersonajeSrv = async ({
  foto,
  nombre,
  especie,
  estado,
  origen,
  tipo,
  genero,
  idUsuario,
}: Personaje) => {
  if (!nombre) {
    return { error: "Es requerido" };
  }
  const response = await prisma.personaje.create({
    data: {
      nombre,
      foto,
      especie,
      estado,
      origen,
      tipo,
      genero,
      idUsuario,
    },
  });
  return response;
};

export const getListaPersonajeSrv = async (idUsuario: number) => {
  const response = await prisma.personaje.findMany({
    where: {
      idUsuario,
      flag: true,
    },
  });
  return response;
};

export const getPersonajeSrv = async (id: number, idUsuario: number) => {
  const response = await prisma.personaje.findFirst({
    where: {
      id,
      flag: true,
      idUsuario,
    },
  });
  if (!response) {
    return 404;
  }
  return response;
};

export const deletePersonajeSrv = async (id: number, idUsuario: number) => {
  // Soft delete: cambiar flag a false
  const isExist = await getPersonajeSrv(id, idUsuario);
  if (isExist === 404) return "No existe personaje";

  const response = await prisma.personaje.update({
    where: {
      id,
      idUsuario,
    },
    data: {
      flag: false,
    },
  });
  return response;
};

export const updatePersonajeSrv = async ({
  id,
  nombre,
  foto,
  especie,
  estado,
  origen,
  tipo,
  genero,
  idUsuario,
}: Personaje) => {
  const isExist = await prisma.personaje.findFirst({
    where: { id },
  });
  if (!isExist) return "No existe personaje";
  if (isExist.idUsuario !== idUsuario) return "No tiene permiso para editar";

  const response = await prisma.personaje.update({
    where: {
      id,
      idUsuario,
    },
    data: {
      nombre,
      foto,
      especie,
      estado,
      origen,
      tipo,
      genero,
    },
  });
  return response;
};
   
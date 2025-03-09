import { Request, Response } from "express";
import {
  createPersonajeSrv,
  getListaPersonajeSrv,
  getPersonajeSrv,
  deletePersonajeSrv,
  updatePersonajeSrv,
} from "../services/personaje.srv";

// **Crear personaje (POST /personaje)**
export const createPersonajeCtrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { idUsuario, nombre, foto, especie, estado, origen, tipo, genero } =
      req.body;

    // 🔥 Definir los campos permitidos
    const allowedFields = [
      "nombre",
      "foto",
      "especie",
      "estado",
      "origen",
      "tipo",
      "genero",
    ];
    const receivedFields = Object.keys(req.body);

    // 🚨 Detectar campos extra (no permitidos)
    const extraFields = receivedFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (extraFields.length > 0) {
      res.status(400).json({
        statusCode: 400,
        msg: `Campos inválidos detectados: ${extraFields.join(", ")}`,
        success: false,
      });
      return;
    }

    if (!idUsuario) {
      res.status(400).json({
        statusCode: 400,
        msg: "El idUsuario es requerido",
        success: false,
      });
      return;
    }

    if (!nombre || !foto) {
      res.status(400).json({
        statusCode: 400,
        msg: "Nombre y foto son requeridos",
        success: false,
      });
      return;
    }

    const response = await createPersonajeSrv(req.body);

    if (!response) {
      res.status(405).json({
        statusCode: 405,
        msg: "No se pudo crear el personaje",
        success: false,
      });
      return;
    }

    res.status(201).json({
      statusCode: 201,
      msg: "Personaje creado correctamente",
      data: response,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      msg: "Error en el servidor",
      error: error.message,
      success: false,
    });
  }
};

// **Listar personajes del usuario (GET /personaje/list)**
export const getListaPersonajeCtrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { idUsuario } = req.body;

    if (!idUsuario) {
      res.status(400).json({
        statusCode: 400,
        msg: "El idUsuario es requerido",
        success: false,
      });
      return;
    }

    const response = await getListaPersonajeSrv(Number(idUsuario));

    res.status(200).json({
      statusCode: 200,
      msg: "Personajes obtenidos",
      data: response || [],
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      msg: "Error en el servidor",
      error: error.message,
      success: false,
    });
  }
};

// **Obtener un personaje específico (GET /personaje/:id)**
export const getPersonajeCtrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { idUsuario } = req.body;

    if (!idUsuario) {
      res.status(400).json({
        statusCode: 400,
        msg: "El idUsuario es requerido",
        success: false,
      });
      return;
    }

    const response = await getPersonajeSrv(Number(id), Number(idUsuario));

    if (response === 404) {
      res.status(404).json({
        statusCode: 404,
        msg: "Personaje no encontrado",
        success: false,
      });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      msg: "Personaje obtenido",
      data: response,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      msg: "Error en el servidor",
      error: error.message,
      success: false,
    });
  }
};

// **Eliminar un personaje (DELETE /personaje/:id)**
export const deletePersonajeCtrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { idUsuario } = req.body;

    if (!idUsuario) {
      res.status(400).json({
        statusCode: 400,
        msg: "El idUsuario es requerido",
        success: false,
      });
      return;
    }

    const response = await deletePersonajeSrv(parseInt(id), Number(idUsuario));

    res.status(200).json({
      statusCode: 200,
      msg: "Personaje eliminado correctamente",
      data: response,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      msg: "Error en el servidor",
      error: error.message,
      success: false,
    });
  }
};

// **Actualizar un personaje (PUT /personaje)**
export const updatePersonajeCtrl = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      id,
      idUsuario,
      nombre,
      foto,
      especie,
      estado,
      origen,
      tipo,
      genero,
    } = req.body;

    // 🔥 Definir los campos permitidos
    const allowedFields = [
      "id",
      "idUsuario",
      "nombre",
      "foto",
      "especie",
      "estado",
      "origen",
      "tipo",
      "genero",
    ];
    const receivedFields = Object.keys(req.body);

    // Detectar campos extra (no permitidos)
    const extraFields = receivedFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (extraFields.length > 0) {
      res.status(400).json({
        statusCode: 400,
        msg: `Campos inválidos detectados: ${extraFields.join(", ")}`,
        success: false,
      });
      return;
    }
    if (!idUsuario) {
      res.status(400).json({
        statusCode: 400,
        msg: "El idUsuario es requerido",
        success: false,
      });
      return;
    }

    if (!id) {
      res.status(400).json({
        statusCode: 400,
        msg: "El id del personaje es requerido",
        success: false,
      });
      return;
    }

    const response = await updatePersonajeSrv(req.body);

    res.status(200).json({
      statusCode: 200,
      msg: "Personaje actualizado correctamente",
      data: response,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      statusCode: 500,
      msg: "Error en el servidor",
      error: error.message,
      success: false,
    });
  }
};

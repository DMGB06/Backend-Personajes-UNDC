import { Request, Response } from "express";
import {
  deleteUsuario,
  getListUsuario,
  getUsuario,
  registerUsuario,
  updateUsuario,
} from "../services/usuario.srv";

export const createUsuarioCtrl = async ({ body }: Request, res: Response) => {
  try {
    //  Extraemos solo los campos permitidos
    const { email, nombres, password } = body;
    const allowedFields = ["nombres","email", "password"];
    const receivedFields = Object.keys(body);

    const extraFields = receivedFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (extraFields.length > 0) {
      res.status(400).send({
        status: false,
        msg: `Credenciales inválidas. Campos extras detectados: ${extraFields.join(
          ", "
        )}`,
      });
      return;
    }

    //  Validamos que los campos requeridos estén presentes
    if (!email || !nombres || !password) {
      res.status(400).json({
        success: false,
        msg: "Faltan campos obligatorios",
      });
      return;
    }

    //  Llamamos a la función con los valores correctos
    const response = await registerUsuario({ email, nombres, password } as any);

    if (response === "ALREADY EXIST") {
      res.status(400).json({ msg: "400", data: response, success: false });
      return;
    }

    res.status(200).json({
      statusCode: 200,
      message: "Se ejecutó correctamente tu solicitud",
      data: response,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

export const updateUsuarioCtrl = async ({ body }: Request, res: Response) => {
    try {
      // Extraemos solo los campos permitidos
      const { id, email, nombres, rol } = body;
      const allowedFields = ["id", "nombres", "email", "rol"];
      const receivedFields = Object.keys(body);
  
      // Validamos si hay campos no permitidos
      const extraFields = receivedFields.filter((field) => !allowedFields.includes(field));
      if (extraFields.length > 0) {
         res.status(400).send({
          status: false,
          msg: `Credenciales inválidas. Campos extras detectados: ${extraFields.join(", ")}`,
        });
        return
      }
  
      // Validamos que el campo ID esté presente
      if (!id) {
        res.status(400).json({
          success: false,
          msg: "El campo 'id' es obligatorio",
        });
        return
      }
  
      // Construimos dinámicamente el objeto con los valores proporcionados
      const dataToUpdate: any = {};
      if (email) dataToUpdate.email = email;
      if (nombres) dataToUpdate.nombres = nombres;
      if (rol) dataToUpdate.rol = rol;
  
      // Si no hay cambios, devolver error
      if (Object.keys(dataToUpdate).length === 0) {
        res.status(400).json({
          success: false,
          msg: "No hay datos para actualizar",
        });
        return
      }
  
      // Llamamos a la función con solo los valores a modificar
      const response = await updateUsuario({ id, ...dataToUpdate });
  
      res.status(200).json({ msg: "Usuario actualizado correctamente", data: response, success: true });
    } catch (error) {
      res.status(500).json({ error, success: false });
    }
  };
  

export const getListaUsuarioCtrl = async (req: Request, res: Response) => {
  try {
    const response = await getListUsuario();
    res
      .status(200)
      .json({ msg: "Ejecución correcta", data: response, success: true });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUsuarioCtrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getUsuario(Number(id));

    if (!response) {
      res
        .status(404)
        .json({ statusCode: 404, msg: "No existe el usuario", success: false });
      return;
    }

    res.status(200).json({ msg: 200, data: response, success: true });
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

export const deleteUsuarioCtrl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const response = await deleteUsuario(parseInt(id));
    res.status(200).json({ msg: 200, data: response, success: true });
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};

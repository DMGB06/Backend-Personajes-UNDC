import { Request, Response } from "express";
import {
    deleteUsuario,
    getListUsuario,
    getUsuario,
    registerUsuario,
    updateUsuario
} from "../services/usuario.srv";

export const createUsuarioCtrl = async ({ body }: Request, res: Response) => {
    try {
        const response = await registerUsuario(body);
        // res.status(200).json({ msg: "200", data: response, success: true });
        if (response === "ALREADY EXIST") { res.status(400).json({ msg: "400", data: response, success: false }); return }
        res.status(200).json({ statusCode: 200, message: "Se ejecuto correctamente tu solicitud", data: response, success: true });
        return
    } catch (error) {
        res.status(500).json({ error, success: false });
    }
};


export const getListaUsuarioCtrl = async (req: Request, res: Response) => {
    try {
        // const { idUsuario } = req.body
        const response = await getListUsuario();
        res.status(200).json({ msg: "Ejecución correcta", data: response, success: true });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getUsuarioCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const response = await getUsuario(Number(id));
        if (!response) { res.status(404).json({ statusCode: 404, msg: 'No existe el usuario', success: false }); return }
        res.status(200).json({ msg: 200, data: response, success: true });
    } catch (error) {
        res.status(500).json({ error, success: false });
    }
};

export const deleteUsuarioCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { idUsuario } = req.body
        const response = await deleteUsuario(parseInt(id));
        res.status(200).json({ msg: 200, data: response, success: true });
    } catch (error) {
        res.status(500).json({ error, success: false });
    }
};

export const updateUsuarioCtrl = async ({ body }: Request, res: Response) => {
    try {
        const response = await updateUsuario(body);
        res.status(200).json({ msg: 200, data: response, success: true });
    } catch (error) {
        res.status(500).json({ error, success: false });
    }
};

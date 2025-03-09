import { Request, Response } from "express";
import { refreshTokenLimit, loginUser } from "../services/auth.srv";

export const refreshTokenLimitCtrl = async (
  { body }: Request,
  res: Response
) => {
  try {
    let { token } = await body;
    const response = await refreshTokenLimit(token);
    if (response === "TOKEN_NO_VALID" || response === "NOT_FOUND_USER") {
      res.status(403).send({ status: false, msg: response });
      return;
    }
    res.status(200).send({ status: true, ...response });
  } catch (error) {
    res
      .status(500)
      .send({ status: false, msg: "ERROR_REFRESH_TOKEN " + error });
  }
};

export const loginCtrl = async ({ body }: Request, res: Response) => {
  try {
    const allowedFields = ["email", "password"];
    const receivedFields = Object.keys(body);

    const extraFields = receivedFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (extraFields.length > 0) {
      res.status(400).send({
        status: false,
        msg: `❌ Credenciales inválidas. Campos extras detectados: ${extraFields.join(
          ", "
        )}`,
      });
      return;
    }

    //Validar que los campos requeridos estén presentes
    if (!body.email || !body.password) {
      res.status(400).send({
        status: false,
        msg: "Error: Debes enviar email y password",
      });
      return;
    }

    //Intentar loguear al usuario
    const response = await loginUser(body);
    if (!response) {
      res.status(403).send({ status: false, msg: "ERROR_CREDENTIALS" });
      return;
    }

    //Enviar respuesta exitosa
    res.status(200).send({ status: true, ...response });
    return;
  } catch (error) {
    res
      .status(500)
      .send({ status: false, msg: "ERROR_LOGIN_AUTH " + error });
    return;
  }
};

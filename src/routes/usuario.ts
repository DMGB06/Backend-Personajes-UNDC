import { Router } from "express";
import {
    createUsuarioCtrl,
    getListaUsuarioCtrl,
    getUsuarioCtrl,
    deleteUsuarioCtrl,
    updateUsuarioCtrl,
} from "../controllers/usuario.ctrl";
// import { createPersonajeValidation } from "../validations/joi/personaje.valid";
import { validateBodyDto, validateParamsDto } from "../middlewares/validate-dto";
import { RolUsuario } from "@prisma/client";
import { rolRequired } from "../middlewares/rol.md";
import { CrearUsuarioDto, ModificarUsuarioDto, GetUsuarioDto } from "../validations/dtos/usuario.dto";
const router = Router();

//podemos usar DTO's o Joi para validar los datos enviados [Ejemplo]
router.post("/",rolRequired(RolUsuario.ADMIN), validateBodyDto(CrearUsuarioDto), createUsuarioCtrl);

router.get("/list", rolRequired(RolUsuario.ADMIN), getListaUsuarioCtrl);

router.get("/only/:id", validateParamsDto(GetUsuarioDto), rolRequired(RolUsuario.ADMIN), getUsuarioCtrl);

router.delete("/:id", validateParamsDto(GetUsuarioDto), rolRequired(RolUsuario.ADMIN), deleteUsuarioCtrl);

router.put("/", rolRequired(RolUsuario.ADMIN), validateBodyDto(ModificarUsuarioDto), updateUsuarioCtrl);

export { router };
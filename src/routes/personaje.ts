import { Router } from "express";
import {
  createPersonajeCtrl,
  getListaPersonajeCtrl,
  getPersonajeCtrl,
  deletePersonajeCtrl,
  updatePersonajeCtrl,
} from "../controllers/personaje.ctrl";
import { CreatePersonajeDto, GetPersonajeDto, UpdatePersonajeDto } from "../validations/dtos/personaje.dto";
import { validateBodyDto, validateParamsDto } from "../middlewares/validate-dto";
import { ValidateSession } from "../middlewares/sesion.md";

const router = Router();

// Crear personaje (POST)
router.post("/", ValidateSession, validateBodyDto(CreatePersonajeDto), createPersonajeCtrl);

// Listar personajes (GET) – se espera idUsuario en la query string
router.get("/list", ValidateSession, getListaPersonajeCtrl);

// Obtener un personaje (GET)
router.get("/only/:id", ValidateSession, validateParamsDto(GetPersonajeDto), getPersonajeCtrl);

// Eliminar personaje (DELETE)
router.delete("/:id", ValidateSession, validateParamsDto(GetPersonajeDto), deletePersonajeCtrl);

// Actualizar personaje (PUT)
router.put("/", ValidateSession, validateBodyDto(UpdatePersonajeDto), updatePersonajeCtrl);

export { router };

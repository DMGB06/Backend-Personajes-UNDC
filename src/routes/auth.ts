import { Router } from "express";
import { loginCtrl, refreshTokenLimitCtrl } from "../controllers/auth.ctrl";
import { LoginDto, tokenDto } from "../validations/dtos/auth.dto";
import { validateBodyDto } from "../middlewares/validate-dto";

const router = Router();

/**
 * http://localhost:3010/auth/login [POST]
 */
router.post("/login", validateBodyDto(LoginDto), loginCtrl);


/**
 * http://localhost:3010/auth/refresh-token [POST]
 */
router.post("/refresh-token", validateBodyDto(tokenDto), refreshTokenLimitCtrl);

export { router };
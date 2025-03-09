import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export const validateBodyDto = (DtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const instance = plainToInstance(DtoClass, req.body);
        const errors = await validate(instance);
        if (errors.length > 0) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                errors: errors.map(err => err.constraints),
            });
            return;
        }
        next();
    };
};

export const validateParamsDto = (DtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Convierte req.params a una instancia del DTO
        const paramsInstance: any = plainToInstance(DtoClass, req.params, {
            enableImplicitConversion: true, // Activa la conversión automática
        });

        const errors = await validate(paramsInstance);
        if (errors.length > 0) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                errors: errors.map(err => err.constraints),
            });
            return
        }

        next();
    };
};
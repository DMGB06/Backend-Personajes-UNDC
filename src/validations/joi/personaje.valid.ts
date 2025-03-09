import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createPersonajeValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            nombre: Joi.string().required(),
            foto: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return; // End the request here, no need to call next()
        }
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updatePersonajeValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            id: Joi.number().required(),
            nombre: Joi.string(),
            foto: Joi.string(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getPersonajeValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            id: Joi.number().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deletePersonajeValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            id: Joi.number().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
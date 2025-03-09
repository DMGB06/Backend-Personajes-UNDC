import Joi from "joi";
export const createUserValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const updateUserValidation = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
});

export const getUserValidation = Joi.object({
    id: Joi.number().required()
});

export const deleteUserValidation = Joi.object({
    id: Joi.number().required()
})
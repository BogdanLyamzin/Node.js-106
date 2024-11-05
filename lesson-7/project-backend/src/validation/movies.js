import Joi from "joi";

import { typeList } from "../constants/movies.js";

export const movieAddSchema = Joi.object({
    title: Joi.string().required(),
    director: Joi.string().required().messages({
        "any.required": `режисера треба вказати`
    }),
    type: Joi.string().valid(...typeList),
})

export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
    type: Joi.string().valid(...typeList),
})

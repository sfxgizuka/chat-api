import Joi from 'joi'
export const postSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    messgae: Joi.string().min(3).max(30).required(),
});
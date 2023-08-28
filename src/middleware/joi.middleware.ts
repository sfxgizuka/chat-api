import joi from 'joi'
import { Request, Response, NextFunction} from 'express';

// Validation middleware
export const validateInput = (schema) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
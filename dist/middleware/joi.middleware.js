"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
// Validation middleware
const validateInput = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
exports.validateInput = validateInput;

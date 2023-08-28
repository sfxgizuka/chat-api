"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    title: joi_1.default.string().alphanum().min(3).max(30).required(),
    messgae: joi_1.default.string().alphanum().min(3).max(30).required(),
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTokenHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class GenerateTokenHandler {
    async handle(command) {
        const { userId } = command;
        const token = jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '1h',
        });
        return token;
    }
}
exports.GenerateTokenHandler = GenerateTokenHandler;

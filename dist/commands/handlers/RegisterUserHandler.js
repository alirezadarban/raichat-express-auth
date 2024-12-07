"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserHandler = void 0;
const User_1 = require("../../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
class RegisterUserHandler {
    async handle(command) {
        const { email, password } = command;
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.User({
            email,
            password: hashedPassword,
        });
        await newUser.save();
    }
}
exports.RegisterUserHandler = RegisterUserHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const RegisterUserCommand_1 = require("../commands/models/RegisterUserCommand");
const RegisterUserHandler_1 = require("../commands/handlers/RegisterUserHandler");
const registerController = async (req, res) => {
    const { email, password } = req.body;
    const command = new RegisterUserCommand_1.RegisterUserCommand(email, password);
    const handler = new RegisterUserHandler_1.RegisterUserHandler();
    try {
        await handler.handle(command);
        res.status(201).send('User registered successfully');
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.registerController = registerController;

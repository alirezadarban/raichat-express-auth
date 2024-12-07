"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const LoginUserCommand_1 = require("../commands/models/LoginUserCommand");
const LoginUserHandler_1 = require("../commands/handlers/LoginUserHandler");
const loginController = async (req, res) => {
    const { email, password } = req.body;
    const command = new LoginUserCommand_1.LoginUserCommand(email, password);
    const handler = new LoginUserHandler_1.LoginUserHandler();
    try {
        const result = await handler.handle(command);
        req.session.user = { id: result.id, email: email };
        res.status(200).json(result.token);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.loginController = loginController;

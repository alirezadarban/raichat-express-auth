"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserController = void 0;
const GetUserQuery_1 = require("../queries/models/GetUserQuery");
const GetUserHandler_1 = require("../queries/handlers/GetUserHandler");
const getUserController = async (req, res) => {
    const userId = req.params.id;
    const query = new GetUserQuery_1.GetUserQuery(userId);
    const handler = new GetUserHandler_1.GetUserHandler();
    try {
        if (req.session.user?.id === userId) {
            res.status(200).json(req.session.user);
        }
        else {
            const user = await handler.handle(query);
            res.status(200).json(user);
        }
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getUserController = getUserController;

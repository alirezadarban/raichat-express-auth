"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserHandler = void 0;
const User_1 = require("../../models/User");
class GetUserHandler {
    async handle(query) {
        const { userId } = query;
        const user = await User_1.User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
exports.GetUserHandler = GetUserHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserCommand = void 0;
class LoginUserCommand {
    email;
    password;
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}
exports.LoginUserCommand = LoginUserCommand;

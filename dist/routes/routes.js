"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = require("../controllers/loginController");
const registerController_1 = require("../controllers/registerController");
const getUserController_1 = require("../controllers/getUserController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middlewares/validation");
const router = express_1.default.Router();
router.post('/register', [
    (0, express_validator_1.check)('email').isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.check)('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number')
        .matches(/[A-Z]/)
        .withMessage('Password must contain an uppercase letter'),
    validation_1.handleValidationErrors,
], registerController_1.registerController);
router.post('/login', [
    (0, express_validator_1.check)('email').isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.check)('password').notEmpty().withMessage('Password is required'),
    validation_1.handleValidationErrors,
], loginController_1.loginController);
router.get('/user/:id', [
    authMiddleware_1.authenticateToken,
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid user ID'),
    validation_1.handleValidationErrors,
], getUserController_1.getUserController);
router.post('/logout', authMiddleware_1.authenticateToken, (req, res) => {
    req.session.destroy((err) => {
        if (err)
            return res.status(500).json({ message: 'Error logging out' });
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logged out successfully' });
    });
});
exports.default = router;

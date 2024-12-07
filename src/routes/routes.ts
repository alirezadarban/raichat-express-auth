import express from 'express';
import { loginController } from '../controllers/loginController';
import { registerController } from '../controllers/registerController';
import { getUserController } from '../controllers/getUserController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { check } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validation';

const router = express.Router();

router.post('/register', 
    [
        check('email').isEmail().withMessage('Invalid email format'),
        check('password')
          .isLength({ min: 8 })
          .withMessage('Password must be at least 8 characters long')
          .matches(/\d/)
          .withMessage('Password must contain a number')
          .matches(/[A-Z]/)
          .withMessage('Password must contain an uppercase letter'),
        handleValidationErrors,
      ],
    registerController);

router.post('/login',
  [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').notEmpty().withMessage('Password is required'),
    handleValidationErrors,
  ],
    loginController);

router.get('/user/:id', 
    [
        authenticateToken,
        check('id').isMongoId().withMessage('Invalid user ID'),
        handleValidationErrors,
    ], 
    getUserController);

router.post('/logout', authenticateToken, (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: 'Error logging out' });
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });

export default router;

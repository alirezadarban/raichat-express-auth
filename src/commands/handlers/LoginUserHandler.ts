import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginUserCommand } from '../models/LoginUserCommand';
import { User } from '../../models/User';

export class LoginUserHandler {
  async handle(command: LoginUserCommand): Promise<{ id: string, token: string }> {
    const { email, password } = command;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    return { id: user.id, token };
  }
}

import { RegisterUserCommand } from '../models/RegisterUserCommand';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';

export class RegisterUserHandler {
  async handle(command: RegisterUserCommand): Promise<void> {
    const { email, password } = command;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
  }
}

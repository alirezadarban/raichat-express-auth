import jwt from 'jsonwebtoken';
import { GenerateTokenCommand } from '../models/GenerateTokenCommand';

export class GenerateTokenHandler {
  async handle(command: GenerateTokenCommand): Promise<string> {
    const { userId } = command;

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    return token;
  }
}

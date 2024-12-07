import { Request, Response } from 'express';
import { RegisterUserCommand } from '../commands/models/RegisterUserCommand';
import { RegisterUserHandler } from '../commands/handlers/RegisterUserHandler';

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const command = new RegisterUserCommand(email, password);
  const handler = new RegisterUserHandler();

  try {
    await handler.handle(command);
    res.status(201).send('User registered successfully');
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

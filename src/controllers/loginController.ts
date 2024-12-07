import { Request, Response } from 'express';
import { LoginUserCommand } from '../commands/models/LoginUserCommand';
import { LoginUserHandler } from '../commands/handlers/LoginUserHandler';

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const command = new LoginUserCommand(email, password);
  const handler = new LoginUserHandler();

  try {
    const result = await handler.handle(command);

    req.session.user = { id: result.id, email: email };

    res.status(200).json(result.token);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

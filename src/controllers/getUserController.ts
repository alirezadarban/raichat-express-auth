import { Request, Response } from 'express';
import { GetUserQuery } from '../queries/models/GetUserQuery';
import { GetUserHandler } from '../queries/handlers/GetUserHandler';

export const getUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const query = new GetUserQuery(userId);
  const handler = new GetUserHandler();

  try {
    if (req.session.user?.id === userId) {
        res.status(200).json(req.session.user);
    } else {
        const user = await handler.handle(query);
        res.status(200).json(user);
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

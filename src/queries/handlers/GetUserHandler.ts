import { GetUserQuery } from '../models/GetUserQuery';
import { User } from '../../models/User';

export class GetUserHandler {
  async handle(query: GetUserQuery) {
    const { userId } = query;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

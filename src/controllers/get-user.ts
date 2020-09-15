import { Request, Response } from 'express';
import { User } from '../models';
import { UserRequestParams } from '../requests';

export const getUser = async (
  req: Request<UserRequestParams>,
  res: Response
): Promise<void> => {
  try {
    // * Get the user using the primary index
    const user = await User.get({
      pk: `USER#${req.params.username}`,
      sk: `PROFILE#${req.params.username}`,
    });

    res.status(200).json(user.toObject());
  } catch (error) {
    if (error.message === 'Not Found') {
      res.sendStatus(404);
    } else {
      res.sendStatus(400);
    }
  }
};

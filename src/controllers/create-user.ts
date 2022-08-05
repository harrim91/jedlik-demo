import { Request, Response } from 'express';
import { User } from '../models/user';
import { CreateUserBody } from './requests';

export const createUser = async (
  req: Request<unknown, unknown, CreateUserBody>,
  res: Response
): Promise<void> => {
  // * Create a new user instance
  const user = User.create({
    pk: `USER#${req.body.username}`,
    sk: `PROFILE#${req.body.username}`,
    username: req.body.username,
    fullName: req.body.fullName,
    email: req.body.email,
    addresses: [req.body.address],
    createdAt: new Date().valueOf(),
  });

  try {
    // * Save the user to DynamoDB
    await user.save();

    // * Success!
    res.status(201).json(user.toObject());
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

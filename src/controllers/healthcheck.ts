import { Request, Response } from 'express';

export const healthcheck = async (_: Request, res: Response): Promise<void> => {
  res.status(200).send('Hello from the Jedlik Demo API!');
};

import { Request, Response } from 'express';
import { DynamoDB, Endpoint } from 'aws-sdk';
import { CreateUserBody } from '../requests';

export const createUser = async (
  req: Request<unknown, unknown, CreateUserBody>,
  res: Response
): Promise<void> => {
  const dynamodb = new DynamoDB.DocumentClient({
    region: 'local',
    accessKeyId: 'xxx',
    secretAccessKey: 'xxx',
    endpoint: new Endpoint('http://dynamodb_local:8000').href,
  });

  const user = {
    pk: `USER#${req.body.username}`,
    sk: `PROFILE#${req.body.username}`,
    username: req.body.username,
    fullName: req.body.fullName,
    email: req.body.email,
    addresses: [req.body.address],
    createdAt: new Date().valueOf(),
  };

  try {
    await dynamodb
      .put({
        TableName: 'ecommerce-store',
        Item: user,
      })
      .promise();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

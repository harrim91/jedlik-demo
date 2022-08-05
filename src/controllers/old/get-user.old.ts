import { Request, Response } from 'express';
import { DynamoDB, Endpoint } from 'aws-sdk';
import { UserRequestParams } from '../requests';

export const getUser = async (
  req: Request<UserRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const dynamodb = new DynamoDB.DocumentClient({
      region: 'local',
      accessKeyId: 'xxx',
      secretAccessKey: 'xxx',
      endpoint: new Endpoint('http://dynamodb_local:8000').href,
    });

    // * Get the user using the primary index
    const data = await dynamodb
      .get({
        TableName: 'ecommerce-store',
        Key: {
          pk: `USER#${req.params.username}`,
          sk: `PROFILE#${req.params.username}`,
        },
      })
      .promise();

    res.status(200).json(data.Item);
  } catch (error) {
    if ((error as Error).message === 'Not Found') {
      res.sendStatus(404);
    } else {
      res.sendStatus(400);
    }
  }
};

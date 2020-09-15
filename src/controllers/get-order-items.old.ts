import { Request, Response } from 'express';
import { DynamoDB, Endpoint } from 'aws-sdk';
import { OrderRequestParams } from '../requests';

export const getOrderItems = async (
  req: Request<OrderRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const dynamodb = new DynamoDB.DocumentClient({
      region: 'local',
      accessKeyId: 'xxx',
      secretAccessKey: 'xxx',
      endpoint: new Endpoint('http://dynamodb_local:8000').href,
    });

    const data = await dynamodb
      .query({
        TableName: 'ecommerce-store',
        ExpressionAttributeNames: {
          '#sk': 'sk',
        },
        ExpressionAttributeValues: {
          ':sk': `ORDER#${req.params.orderId}`,
        },
        KeyConditionExpression: '#sk = :sk',
        IndexName: 'reverse-index',
      })
      .promise();

    res.status(200).json(data.Items);
  } catch (error) {
    res.sendStatus(500);
  }
};

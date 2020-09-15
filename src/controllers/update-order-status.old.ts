import { Request, Response } from 'express';
import { DynamoDB, Endpoint } from 'aws-sdk';
import {
  OrderRequestParams,
  UserRequestParams,
  OrderStatusQuery,
} from '../requests';

export const updateOrderStatus = async (
  req: Request<
    UserRequestParams & OrderRequestParams,
    unknown,
    OrderStatusQuery
  >,
  res: Response
): Promise<void> => {
  const dynamodb = new DynamoDB.DocumentClient({
    region: 'local',
    accessKeyId: 'xxx',
    secretAccessKey: 'xxx',
    endpoint: new Endpoint('http://dynamodb_local:8000').href,
  });
  try {
    await dynamodb.update({
      TableName: 'ecommerce-store',
      Key: {
        pk: `USER#${req.params.username}`,
        sk: `ORDER#${req.params.orderId}`,
      },
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': req.body.status,
      },
      UpdateExpression: 'SET #status = :status',
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

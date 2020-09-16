import { Request, Response } from 'express';
import { DynamoDB, Endpoint } from 'aws-sdk';
import { OrderStatusQuery, UserRequestParams } from '../requests';

export const getUserOrdersByStatus = async (
  req: Request<UserRequestParams, unknown, unknown, OrderStatusQuery>,
  res: Response
): Promise<void> => {
  if (!req.query.status) {
    res.sendStatus(400);
  } else {
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
          '#pk': 'pk',
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ':pk': `USER#${req.params.username}`,
          ':status': req.query.status,
        },
        KeyConditionExpression: '#pk = :pk',
        FilterExpression: '#status = :status',
      })
      .promise();

    res.status(200).json(data.Items);
  }
};

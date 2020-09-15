import { Request, Response } from 'express';
import { DynamoDB, Endpoint } from 'aws-sdk';

export const getOpenOrders = async (
  _: Request,
  res: Response
): Promise<void> => {
  const dynamodb = new DynamoDB.DocumentClient({
    region: 'local',
    accessKeyId: 'xxx',
    secretAccessKey: 'xxx',
    endpoint: new Endpoint('http://dynamodb_local:8000').href,
  });

  const data = await dynamodb
    .scan({
      TableName: 'ecommerce-store',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': 'open',
      },
      FilterExpression: '#status = :status',
    })
    .promise();

  res.status(200).json(data.Items);
};

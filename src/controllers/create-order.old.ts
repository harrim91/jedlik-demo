import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { DynamoDB, Endpoint } from 'aws-sdk';
import { CreateOrderBody, UserRequestParams } from '../requests';

export const createOrder = async (
  req: Request<UserRequestParams, unknown, CreateOrderBody>,
  res: Response
): Promise<void> => {
  try {
    const orderId = uuid();

    const dynamodb = new DynamoDB.DocumentClient({
      region: 'local',
      accessKeyId: 'xxx',
      secretAccessKey: 'xxx',
      endpoint: new Endpoint('http://dynamodb_local:8000').href,
    });

    const order = {
      pk: `USER#${req.params.username}`,
      sk: `ORDER#${orderId}`,
      id: orderId,
      username: req.params.username,
      status: 'open',
      createdAt: new Date().valueOf(),
      address: req.body.address,
    };

    await dynamodb
      .put({
        TableName: 'ecommerce-store',
        Item: order,
      })
      .promise();

    const orderItems = await Promise.all(
      req.body.items.map(async (item) => {
        const orderItem = {
          pk: `ITEM#${item.id}`,
          sk: `ORDER#${orderId}`,
          itemId: item.id,
          orderId,
          productName: item.name,
          price: item.price,
        };

        await dynamodb
          .put({
            TableName: 'ecommerce-store',
            Item: orderItem,
          })
          .promise();
        return orderItem;
      })
    );

    res.status(201).json({
      ...order,
      items: orderItems,
    });
  } catch (error) {
    res.status(500);
  }
};

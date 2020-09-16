import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { CreateOrderBody, UserRequestParams } from './requests';

export const createOrder = async (
  req: Request<UserRequestParams, unknown, CreateOrderBody>,
  res: Response
): Promise<void> => {
  const orderId = uuid();

  try {
    const order = Order.create({
      pk: `USER#${req.params.username}`,
      sk: `ORDER#${orderId}`,
      id: orderId,
      username: req.params.username,
      status: 'open',
      createdAt: new Date().valueOf(),
      address: req.body.address,
    });

    await order.save();

    const orderItems = await Promise.all(
      req.body.items.map(async (item) => {
        const orderItem = OrderItem.create({
          pk: `ITEM#${item.id}`,
          sk: `ORDER#${orderId}`,
          itemId: item.id,
          orderId,
          productName: item.name,
          price: item.price,
        });

        await orderItem.save();
        return orderItem;
      })
    );

    res.status(201).json({
      ...order.toObject(),
      items: orderItems.map((item) => item.toObject()),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

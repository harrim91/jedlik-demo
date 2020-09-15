import { Request, Response } from 'express';
import { Order } from '../models';
import { OrderStatusQuery, UserRequestParams } from '../requests';

export const getUserOrdersByStatus = async (
  req: Request<UserRequestParams, unknown, unknown, OrderStatusQuery>,
  res: Response
): Promise<void> => {
  if (!req.query.status) {
    res.sendStatus(400);
  } else {
    const orders = await Order.query(
      {
        pk: `USER#${req.params.username}`,
      },
      { filters: { key: 'status', operator: '=', value: req.query.status } }
    );

    res.status(200).json(orders.map((order) => order.toObject()));
  }
};

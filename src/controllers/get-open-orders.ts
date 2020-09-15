import { Request, Response } from 'express';
import { Order } from '../models';

export const getOpenOrders = async (
  _: Request,
  res: Response
): Promise<void> => {
  const orders = await Order.scan({
    filters: { key: 'status', operator: '=', value: 'open' },
  });

  res.status(200).json(orders.map((order) => order.toObject()));
};

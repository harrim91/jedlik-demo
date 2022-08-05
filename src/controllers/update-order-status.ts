import { Request, Response } from 'express';
import { Order } from '../models/order';
import {
  OrderRequestParams,
  UserRequestParams,
  OrderStatusQuery,
} from './requests';

export const updateOrderStatus = async (
  req: Request<
    UserRequestParams & OrderRequestParams,
    unknown,
    OrderStatusQuery
  >,
  res: Response
): Promise<void> => {
  try {
    // * get the order
    const order = await Order.get({
      pk: `USER#${req.params.username}`,
      sk: `ORDER#${req.params.orderId}`,
    });

    // * get the status attribute from the order instance
    const currentStatus = order.get('status');

    if (currentStatus !== 'shipped' && currentStatus !== 'cancelled') {
      // * set a new status on the order
      order.set({ status: req.body.status });

      // * save it
      await order.save();
    }

    res.status(200).json(order.toObject());
  } catch (error) {
    if ((error as Error).message === 'Not Found') {
      res.sendStatus(404);
    } else {
      res.sendStatus(500);
    }
  }
};

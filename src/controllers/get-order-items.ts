import { Request, Response } from 'express';
import { jedlikClient } from '../models/config';
import { OrderRequestParams } from './requests';

export const getOrderItems = async (
  req: Request<OrderRequestParams>,
  res: Response
): Promise<void> => {
  try {
    const data = await jedlikClient.query(
      {
        sk: `ORDER#${req.params.orderId}`,
      },
      { index: 'reverse-index' }
    );

    res.status(200).json(data);
  } catch (error) {
    res.sendStatus(500);
  }
};

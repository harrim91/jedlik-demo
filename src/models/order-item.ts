import * as jedlik from '@peak-ai/jedlik';
import Joi from '@hapi/joi';
import { config } from './config';

type OrderItemProps = {
  pk: string;
  sk: string;
  itemId: string;
  orderId: string;
  productName: string;
  price: number;
};

const orderItemSchema = Joi.object({
  pk: Joi.string()
    .regex(/^ITEM#/)
    .required(),
  sk: Joi.string()
    .regex(/^ORDER#/)
    .required(),
  itemId: Joi.string().required(),
  orderId: Joi.string().required(),
  productName: Joi.string().required(),
  price: Joi.number().required(),
});

export const OrderItem = new jedlik.Model<OrderItemProps>(
  {
    table: 'ecommerce-store',
    schema: orderItemSchema,
  },
  config
);

import * as jedlik from '@peak-ai/jedlik';
import Joi from '@hapi/joi';
import { config } from './config';
import { Address, addressSchema } from './address';

type OrderProps = {
  pk: string;
  sk: string;
  id: string;
  username: string;
  status: 'open' | 'picked' | 'shipped' | 'cancelled';
  createdAt: number;
  address: Address;
};

const orderSchema = Joi.object({
  pk: Joi.string()
    .regex(/^USER#/)
    .required(),
  sk: Joi.string()
    .regex(/^ORDER#/)
    .required(),
  id: Joi.string().required(),
  username: Joi.string().required(),
  status: Joi.string()
    .allow('open', 'picked', 'shipped', 'cancelled')
    .required(),
  createdAt: Joi.number().required(),
  address: addressSchema.required(),
});

export const Order = new jedlik.Model<OrderProps>(
  {
    table: 'ecommerce-store',
    schema: orderSchema,
  },
  config
);

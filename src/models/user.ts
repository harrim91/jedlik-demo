import * as jedlik from '@peak-ai/jedlik';
import Joi from '@hapi/joi';
import { config } from './config';
import { Address, addressSchema } from './address';

type UserProps = {
  pk: string;
  sk: string;
  username: string;
  fullName: string;
  email: string;
  addresses: Address[];
  createdAt: number;
};

const userSchema = Joi.object({
  pk: Joi.string()
    .regex(/^USER#/)
    .required(),
  sk: Joi.string()
    .regex(/^PROFILE#/)
    .required(),
  username: Joi.string().required(),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  createdAt: Joi.number().required(),
  addresses: Joi.array().items(addressSchema).max(10).required(),
});

export const User = new jedlik.Model<UserProps>(
  {
    table: 'ecommerce-store',
    schema: userSchema,
  },
  config
);

import * as jedlik from '@peak-ai/jedlik';
import Joi from '@hapi/joi';
import { Endpoint } from 'aws-sdk';

const config: jedlik.ServiceConfig = {
  region: 'local',
  accessKeyId: 'xxx',
  secretAccessKey: 'xxx',
  endpoint: new Endpoint('http://dynamodb_local:8000').href,
};

export type Address = {
  name: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
};

const addressSchema = Joi.object({
  name: Joi.string().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  postcode: Joi.string().required(),
  country: Joi.string().required(),
});

/**
 *
 * * Set up User model
 *
 */
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

/**
 * * Set up Order model
 *
 */

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

/**
 * * Set up OrderItem model
 *
 */

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

export const jedlikClient = new jedlik.Client('ecommerce-store', config);

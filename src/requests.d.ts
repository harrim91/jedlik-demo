import { Address } from './models';

/**
 * * API request parameter definitions
 */

export type CreateOrderBody = {
  address: Address;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
};

export type CreateUserBody = {
  username: string;
  fullName: string;
  email: string;
  address: Address;
};

export type OrderRequestParams = {
  orderId: string;
};

export type OrderStatusQuery = {
  status: 'open' | 'picked' | 'shipped' | 'cancelled';
};

export type UserRequestParams = {
  username: string;
};

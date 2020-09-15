import express from 'express';
import { healthcheck } from './controllers/healthcheck';
import { createUser } from './controllers/create-user';
import { getUser } from './controllers/get-user';
import { createOrder } from './controllers/create-order';
import { updateOrderStatus } from './controllers/update-order-status';
import { getUserOrdersByStatus } from './controllers/get-user-orders-by-status';
import { getOpenOrders } from './controllers/get-open-orders';
import { getOrderItems } from './controllers/get-order-items';

const app = express();

app.use(express.json());

/**
 * * Healthcheck
 */

app.get('/', healthcheck);

/**
 * * Create a user
 */
app.post('/sign-up', createUser);

/**
 * * Find a user by username
 */
app.get('/user/:username/profile', getUser);

/**
 * * Create an order
 */
app.post('/user/:username/order', createOrder);

/**
 * * Update the status of an order
 */
app.patch('/user/:username/order/:orderId', updateOrderStatus);

/**
 * * Find a users orders by status
 */
app.get('/user/:username/orders', getUserOrdersByStatus);

/**
 * * Get all open orders
 */
app.get('/open-orders', getOpenOrders);

/**
 * * Find an order and items
 */
app.get('/order/:orderId', getOrderItems);

app.listen(3000);

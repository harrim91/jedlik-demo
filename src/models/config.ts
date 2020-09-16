import { ServiceConfig, Client } from '@peak-ai/jedlik';
import { Endpoint } from 'aws-sdk';

export const config: ServiceConfig = {
  region: 'local',
  accessKeyId: 'xxx',
  secretAccessKey: 'xxx',
  endpoint: new Endpoint('http://dynamodb_local:8000').href,
};

export const jedlikClient = new Client('ecommerce-store', config);

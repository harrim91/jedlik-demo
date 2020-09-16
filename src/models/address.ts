import Joi from 'joi';

export type Address = {
  name: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
};

export const addressSchema = Joi.object({
  name: Joi.string().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  postcode: Joi.string().required(),
  country: Joi.string().required(),
});

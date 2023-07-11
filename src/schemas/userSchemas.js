import joi from "joi";

export const schemaCadastro = joi.object({
  user: joi.string().required(),
  password: joi.string().required().min(3),
  email: joi.string().required().email()
});

export const schemaLogin = joi.object({
  password: joi.string().required(),
  email: joi.string().required().email()
});

import joi from "joi";

const schemaTransacao = joi.object({
  valor: joi.number().positive().precision(2).required(),
  descricao: joi.string().required(),
});

export default schemaTransacao;
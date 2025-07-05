const Joi = require('joi');

const noteSchema = Joi.object({
  content: Joi.string().required(),
});

const querySchema = Joi.object({
  client: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  description: Joi.string().trim().required(),
  status: Joi.string().valid('Open', 'InProgress', 'Closed').optional(),
  resolution: Joi.string().trim().optional(),
  notes: Joi.array().items(noteSchema).optional(),
});

module.exports = {querySchema, noteSchema};

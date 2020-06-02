const { celebrate, Segments, Joi } = require('celebrate');

export const get = () => {
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  })
}
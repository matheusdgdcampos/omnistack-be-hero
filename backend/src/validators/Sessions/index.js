const { celebrate, Joi, Segments } = require('celebrate');

export const create = () => {
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  })
}
const { celebrate, Joi, Segments } = require('celebrate');

export const get = () => {
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
      })
    })
  },

  export const show = () => {
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        id: Joi.string().required()
      })
    })
  },

  export const create = () => {
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.string().min(10).max(11).required(),
        city: Joi.string().required(),
        uf: Joi.string().length(2).required()
      })
    })
  }
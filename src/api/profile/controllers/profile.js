'use strict'

/**
 *  profile controller
 */

const { createCoreController } = require('@strapi/strapi').factories

const sanitizeUser = (user) => {
   const { password, resetPasswordToken, confirmationToken, ...sanitizedUser } =
      user
   return sanitizedUser
}

module.exports = createCoreController('api::profile.profile', ({ strapi }) => ({
   async find(ctx) {
      const users = await strapi.entityService.findMany(
         'plugin::users-permissions.user',
         { ...ctx.params, populate: ['role'] }
      )

      ctx.body = users.map((user) => sanitizeUser(user))
   },
   async findOne(ctx) {
      const { id } = ctx.params
      if (!ctx.state.user) {
         return ctx.unauthorized()
      }
      const user = await strapi.entityService.findOne(
         'plugin::users-permissions.user',
         id,
         { populate: ['role'] }
      )

      ctx.body = sanitizeUser(user)
   },
}))

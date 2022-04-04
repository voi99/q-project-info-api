module.exports = (plugin) => {
   const sanitizeOutput = (user) => {
      const {
         password,
         resetPasswordToken,
         confirmationToken,
         ...sanitizedUser
      } = user // be careful, you need to omit other private attributes yourself
      return sanitizedUser
   }

   plugin.controllers.user.me = async (ctx) => {
      if (!ctx.state.user) {
         return ctx.unauthorized()
      }
      const user = await strapi.entityService.findOne(
         'plugin::users-permissions.user',
         ctx.state.user.id,
         { populate: ['role'] }
      )

      ctx.body = sanitizeOutput(user)
   }

   plugin.controllers.user.find = async (ctx) => {
      const users = await strapi.entityService.findMany(
         'plugin::users-permissions.user',
         { ...ctx.params, populate: ['role'] }
      )

      ctx.body = users.map((user) => sanitizeOutput(user))
   }

   plugin.controllers.user.findOne = async (ctx) => {
      if (!ctx.state.user) {
         return ctx.unauthorized()
      }
      const { id } = ctx.params

      const user = await strapi.entityService.findOne(
         'plugin::users-permissions.user',
         id,
         { populate: ['role'] }
      )

      ctx.body = sanitizeOutput(user)
   }

   plugin.controllers.user.update = async (ctx) => {
      const { id } = ctx.params
      const { request } = ctx

      const user = await strapi.entityService.update(
         'plugin::users-permissions.user',
         id,
         { data: request.body.data }
      )

      ctx.body = sanitizeOutput(user)
      console.log(ctx.body)
   }

   return plugin
}

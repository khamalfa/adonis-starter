import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleAuthorization {
  async handle(ctx: HttpContext, next: NextFn, allowedRoles: string[]) {
    try {
      // Get the authenticated user
      const user = ctx.auth.user
      console.log(allowedRoles)

      if (!user) {
        return ctx.response.status(401).json({ error: 'Unauthorized' })
      }

      if (!allowedRoles.includes(user.role)) {
        return ctx.response.status(403).json({ error: 'Forbidden' })
      }

      await next()
    } catch (error) {
      // User is not authenticated or an error occurred
      return ctx.response.status(401).json({ error: 'Unauthorized' })
    }
  }
}

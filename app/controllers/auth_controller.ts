import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

export default class AuthController {
  /**
   * Display a list of resource
   */
  async register({ response, request }: HttpContext) {
    try {
      let { email, password, fullName, role } = request.body()
      const user = await User.create({ email, password, fullName, role })
      return response.status(201).send(user)
    } catch (error) {
      logger.error(error)
      return response.status(500).send({ message: 'ServerError' })
    }
  }

  /**
   * Display form to create a new record
   */
  async login({ auth, response, request }: HttpContext) {
    let { email, password, source } = request.body()

    const user = await User.verifyCredentials(email, password)

    // cred wrong
    if (!user) {
      return response.status(404).send({ message: 'Invalid Credenstial' })
    }

    let duration = source === 'mobile' ? '' : '1 day'

    let token = null

    if (!auth.isAuthenticated) {
      token = await User.accessTokens.create(user, ['*'], {
        expiresIn: duration,
      })
    } else {
      token = user.currentAccestoken
    }
    return response.status(200).send({ user, token })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    // console.log(user) // User
    // console.log(auth.authenticatedViaGuard) // 'api'
    // console.log(auth.user!.currentAccessToken) // AccessToken

    return response.status(200).send(user)
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}

/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return { hello: 'world' }
})

//auth
router
  .group(() => {
    router.post('register', [AuthController, 'register']).as('auth.register')
    router.post('login', [AuthController, 'login']).as('auth.login')
  })
  .prefix('auth')

router.get('auth/current', [AuthController, 'show']).use([
  middleware.auth({
    guards: ['api'],
  }),
])

router.get('users', [UsersController, 'index']).use([
  middleware.auth({
    guards: ['api'],
  }),
  middleware.role(['superadmin']),
])

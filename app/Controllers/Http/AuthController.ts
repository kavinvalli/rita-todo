import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from '../../Models/User'

export default class AuthController {
  public showLogin = ({ inertia }: HttpContextContract) => inertia.render('auth/login')

  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    await auth.use('web').attempt(email, password)
    return response.redirect('/todos')
  }

  public showRegister = ({ inertia }: HttpContextContract) => inertia.render('auth/register')

  public async register({ auth, request, response, session }: HttpContextContract) {
    const newUserSchema = schema.create({
      name: schema.string({}, []),
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
    })

    try {
      const payload = await request.validate({
        schema: newUserSchema,
        messages: {
          'required': 'The field: {{ field }} is required',
          'email.unique': 'User with email exists',
          'password_confirmation.confirmed': 'Passwords do not match',
        },
      })
      const user = await User.create(payload)
      await auth.login(user)
      return response.redirect('/todos')
    } catch (error) {
      session.flash('errors', error.messages)
      return response.redirect('/auth/register')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}

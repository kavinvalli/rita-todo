/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.get('/', async ({ inertia }) => {
  return inertia.render('index')
}).middleware('guest')

Route.get('/login', ({ response }: HttpContextContract) => response.redirect('/auth/login'))

Route.group(() => {
  Route.group(() => {
    Route.get('/login', 'AuthController.showLogin')
    Route.post('/login', 'AuthController.login')
    Route.get('/register', 'AuthController.showRegister')
    Route.post('/register', 'AuthController.register')
  }).middleware('guest')
  Route.get('/logout', 'AuthController.logout')
}).prefix('/auth')

Route.group(() => {
  Route.get('/github/redirect', 'SocialAuthController.githubRedirect')
  Route.get('/github/callback', 'SocialAuthController.githubCallback')
  Route.get('/google/redirect', 'SocialAuthController.googleRedirect')
  Route.get('/google/callback', 'SocialAuthController.googleCallback')
}).middleware('guest')

Route.resource('todos', 'TodosController')
  .only(['index', 'store', 'update'])
  .middleware({
    '*': ['auth'],
  })

Route.get('/admin', async ({ inertia }) => {
  return inertia.render('index')
}).middleware('admin')

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index({ inertia, auth }: HttpContextContract) {
    const todos = await auth.user!.related('todos').query().orderBy('created_at', 'desc')
    return inertia.render('todos', {
      todos,
    })
  }

  public async store({ request, auth, response }: HttpContextContract) {
    await Todo.create({
      title: request.input('title'),
      details: request.input('details'),
      userId: auth.user!.id,
    })
    return response.redirect('/todos')
  }

  public async update({ params, session, response }: HttpContextContract) {
    const todo = await Todo.find(params.id)
    if (!todo) {
      session.flash('errors', {
        id: 'Todo with id does not exist',
      })
    } else {
      todo.done = true
      await todo.save()
    }
    return response.redirect('/todos')
  }
}

import { ErrorBag, Errors } from '@inertiajs/inertia'
import { useForm, usePage } from '@inertiajs/inertia-react'
import React, { useState } from 'react'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import TextArea from '../components/TextArea'
import TextInput from '../components/TextInput'
import Todo from '../components/Todo'
import { ITodo } from '../lib/types'
import useTitle from '../lib/use-title'

interface ITodosProps {
  todos: ITodo[]
}

const Todos: React.FC<ITodosProps> = ({ todos }: ITodosProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const notDoneTodos = todos.filter(({ done }) => done == false)
  const doneTodos = todos.filter(({ done }) => done == true)
  useTitle('Todos')

  return (
    <Layout
      links={[
        {
          href: '/auth/logout',
          label: 'Logout',
        },
      ]}
    >
      <div className="flex items-center justify-center w-full h-full px-5">
        <div className="w-full max-w-lg p-5 bg-white rounded-lg">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xl font-bold">Todos</h3>
            <button className="button" onClick={() => setShowModal(true)}>
              Create
            </button>
          </div>
          <div className="todos mt-2">
            <div className="not-done">
              <h4 className="text-lg font-semibold">Pending</h4>
              {notDoneTodos && notDoneTodos.length > 0 ? (
                notDoneTodos.map((notDoneTodo) => <Todo key={notDoneTodo.id} {...notDoneTodo} />)
              ) : (
                <p className="text-gray-500 my-7">No Todo Yet</p>
              )}
            </div>
            <div className="done">
              <h4 className="text-lg font-semibold">Completed</h4>
              {doneTodos &&
                doneTodos.length > 0 &&
                doneTodos.map((doneTodo) => <Todo key={doneTodo.id} {...doneTodo} />)}
            </div>
          </div>
        </div>
      </div>
      <CreateTodoModal show={showModal} onClose={() => setShowModal(false)} />
    </Layout>
  )
}

interface ICreateTodoModalProps {
  onClose: () => void
  show: boolean
}

const CreateTodoModal: React.FC<ICreateTodoModalProps> = ({ onClose, show }) => {
  const { setData, post, processing } = useForm({
    title: '',
    details: '',
  })

  return (
    <Modal title="Create Todo" show={show} onClose={onClose}>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          post('/todos', {
            onSuccess: () => {
              onClose()
            },
          })
        }}
      >
        <TextInput
          name="title"
          label="Title"
          placeholder="Take dog for a walk"
          type="text"
          className="my-4"
          disabled={processing}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('title', e.target.value)}
          required
        />
        <TextArea
          label="Details"
          placeholder="Lorem ipsum dolor sit amet constectuer init"
          className="my-4 w-full"
          disabled={processing}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setData('details', e.target.value)
          }
        />
        <button className="button">Create</button>
      </form>
    </Modal>
  )
}

export default Todos

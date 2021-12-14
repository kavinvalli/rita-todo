import { Inertia } from '@inertiajs/inertia'
import React, { useState } from 'react'
import { ITodo } from '../lib/types'
import Modal from './Modal'

const Todo: React.FC<ITodo> = ({ id, title, details, done, created_at, updated_at }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <div
        className="bg-gray-bg rounded-lg p-5 m-2 flex justify-between items-center cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div>
          <h4 className="text-md">{title}</h4>
          <p className="text-xs text-gray-400">
            {done
              ? `Completed at: ${new Date(updated_at).getDate()}-${new Date(
                  updated_at
                ).getMonth()}-${new Date(updated_at).getFullYear()}`
              : `Created at: ${new Date(created_at).getDate()}-${new Date(
                  created_at
                ).getMonth()}-${new Date(created_at).getFullYear()}`}
          </p>
        </div>
        <div>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.stopPropagation()
              e.preventDefault()
              Inertia.put(`/todos/${id}`)
            }}
            disabled={done}
            className={`rounded-full w-4 h-4 border-2 border-gray-500 ${done && 'hidden'}`}
          ></button>
        </div>
      </div>
      <TodoDetailModal
        id={id}
        title={title}
        done={done}
        onClose={() => setShowModal(false)}
        details={details}
        show={showModal}
      />
    </>
  )
}

interface ITodoDetailModalProps extends ITodo {
  onClose: () => void
  show: boolean
}

const TodoDetailModal: React.FC<ITodoDetailModalProps> = ({
  id,
  title,
  details,
  onClose,
  show,
}) => {
  return (
    <Modal title={title} onClose={onClose} show={show}>
      <div className="my-4">{details}</div>
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault()
          Inertia.put(`/todos/${id}`)
        }}
      >
        <button className="button">Mark as Done</button>
      </form>
    </Modal>
  )
}

export default Todo

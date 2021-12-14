import React from 'react'

interface IModalProps {
  children: React.ReactNode
  title: string
  onClose: () => void
  show: boolean
}

const Modal: React.FC<IModalProps> = ({ children, title, onClose, show }) => {
  if (show) {
    return (
      <div className="fixed top-0 left-0 h-screen w-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-5 max-w-md w-full">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-xl font-bold">{title}</h3>
            <p onClick={onClose} className="cursor-pointer">
              x
            </p>
          </div>
          {children}
        </div>
      </div>
    )
  } else {
    return <></>
  }
}

export default Modal

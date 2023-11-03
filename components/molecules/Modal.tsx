import React, { useEffect, useRef } from 'react'

type ModalType = 'success' | 'info' | 'error'

interface ColorType {
  backdrop: string
  heading: string
}

interface Props {
  type: ModalType
  title: string
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

export default function Modal({ type, title, children, open, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const colorTypes: Record<ModalType, ColorType> = {
    success: {
      backdrop: 'backdrop:bg-green-200/50',
      heading: 'bg-green-400',
    },
    error: {
      backdrop: 'backdrop:bg-red-200/50',
      heading: 'bg-red-400',
    },
    info: {
      backdrop: 'backdrop:bg-blue-200/50',
      heading: 'bg-blue-400',
    },
  }

  const colors = colorTypes[type]

  useEffect(() => {
    open ? dialogRef.current?.showModal() : dialogRef.current?.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className={`${colors.backdrop} backdrop:backdrop-blur-sm rounded-md shadow-md w-[40%] outline-none`}
    >
      <div className={`flex justify-between p-3 ${colors.heading}`}>
        <h1 className="text-xl font-semibold">{title}</h1>
        <button onClick={onClose} className="outline-none">
          <i className="ti ti-x text-xl" />
        </button>
      </div>
      <div className="p-3">{children}</div>
    </dialog>
  )
}

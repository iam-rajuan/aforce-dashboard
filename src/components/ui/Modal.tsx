import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/45 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className={cn('w-full max-w-2xl rounded-3xl border border-border bg-[#121922] shadow-2xl shadow-black/60', className)}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <h3 className="text-[1.75rem] font-semibold text-white">{title}</h3>
          <button className="text-text-muted transition hover:text-white" onClick={onClose} aria-label="Close modal">
            <X className="h-5 w-5" />
          </button>
        </header>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

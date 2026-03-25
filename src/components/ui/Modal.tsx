import { ReactNode } from 'react'
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

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <div className={cn('w-full max-w-2xl rounded-3xl border border-border bg-card', className)}>
        <header className="flex items-center justify-between border-b border-border p-5">
          <h3 className="text-3xl font-bold text-white">{title}</h3>
          <button className="text-text-muted transition hover:text-white" onClick={onClose}>
            <X />
          </button>
        </header>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

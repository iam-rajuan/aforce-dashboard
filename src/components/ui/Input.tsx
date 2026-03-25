import { InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ className, label, ...props }: InputProps) {
  return (
    <label className="grid gap-2 text-sm text-text-muted">
      {label ? <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">{label}</span> : null}
      <input
        className={cn('h-11 rounded-xl border border-border bg-panel px-4 text-white outline-none transition focus:border-neon focus:ring-2 focus:ring-neon/20', className)}
        {...props}
      />
    </label>
  )
}

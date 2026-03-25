import { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type Variant = 'primary' | 'ghost' | 'danger' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-neon text-black hover:brightness-110 shadow-neon',
  ghost: 'bg-panel text-text-muted hover:text-white border border-border',
  secondary: 'bg-slate-700 text-white hover:bg-slate-600',
  danger: 'bg-red-500 text-white hover:bg-red-400',
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn('h-11 rounded-xl px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50', variantClasses[variant], className)}
      {...props}
    />
  )
}

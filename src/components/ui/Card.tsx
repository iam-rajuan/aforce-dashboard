import { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface CardProps {
  title?: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function Card({ title, subtitle, action, children, className }: CardProps) {
  return (
    <section className={cn('rounded-2xl border border-border bg-card p-5', className)}>
      {title || subtitle || action ? (
        <header className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title ? <h3 className="text-xl font-semibold text-white">{title}</h3> : null}
            {subtitle ? <p className="text-sm text-text-muted">{subtitle}</p> : null}
          </div>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  )
}

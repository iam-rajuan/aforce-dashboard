import { ReactNode } from 'react'
import { Bell, CircleHelp, Search } from 'lucide-react'

interface TopbarProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function Topbar({ title, subtitle, action }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-black/85 px-6 py-4 backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          {subtitle ? <p className="text-sm text-text-muted">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-10 w-full max-w-xl items-center gap-2 rounded-xl border border-border bg-panel px-3 text-text-muted">
          <Search className="h-4 w-4" />
          <input className="w-full bg-transparent text-sm outline-none" placeholder="Search analytics, users, orders..." />
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full border border-border bg-panel p-2 text-text-muted hover:text-white"><Bell className="h-4 w-4" /></button>
          <button className="rounded-full border border-border bg-panel p-2 text-text-muted hover:text-white"><CircleHelp className="h-4 w-4" /></button>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-white">Alex Rivera</p>
            <p className="text-xs text-neon">SUPER ADMIN</p>
          </div>
        </div>
      </div>
    </header>
  )
}

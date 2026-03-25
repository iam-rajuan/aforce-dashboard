import { ReactNode } from 'react'

interface AuthShellProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-auth px-4">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-neon/20 blur-3xl" />
      <div className="w-full max-w-md rounded-3xl border border-border bg-card/90 p-7 shadow-2xl shadow-neon/10">
        <div className="mb-7 text-center">
          <p className="mb-2 text-sm font-semibold text-neon">AForce Admin</p>
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-sm text-text-muted">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

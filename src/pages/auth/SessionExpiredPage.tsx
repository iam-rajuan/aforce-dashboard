import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export function SessionExpiredPage() {
  const navigate = useNavigate()
  return (
    <div className="grid min-h-screen place-items-center bg-auth px-4">
      <section className="w-full max-w-md rounded-3xl border border-border bg-card text-center">
        <div className="rounded-t-3xl bg-gradient-to-b from-neon/25 to-card p-10">
          <h1 className="text-5xl font-bold text-white">Session Expired</h1>
          <p className="mt-3 text-text-muted">Your session has expired for security reasons.</p>
        </div>
        <div className="space-y-4 p-6">
          <Button className="w-full" onClick={() => navigate('/login')}>Login Again</Button>
          <div className="text-sm text-text-muted">Support · Security Policy</div>
        </div>
      </section>
    </div>
  )
}

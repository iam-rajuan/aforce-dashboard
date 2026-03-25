import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthShell } from './AuthShell'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useAuthStore } from '../../store/authStore'

export function LoginPage() {
  const [email, setEmail] = useState('admin@aforce.com')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const isValid = login(email, password)
    if (!isValid) {
      setError('Incorrect email or password.')
      return
    }
    navigate('/2fa')
  }

  return (
    <AuthShell title="Admin Login" subtitle="Sign in to your administrator account">
      <form className="space-y-4" onSubmit={onSubmit}>
        {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p> : null}
        <Input label="Email Address" value={email} onChange={(event) => setEmail(event.target.value)} />
        <label className="grid gap-2 text-sm text-text-muted">
          <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Password</span>
          <div className="relative">
            <input
              className="h-11 w-full rounded-xl border border-border bg-panel px-4 pr-16 text-white outline-none transition focus:border-neon focus:ring-2 focus:ring-neon/20"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-neon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>
        <div className="flex items-center justify-between text-sm text-text-muted">
          <label className="flex items-center gap-2"><input type="checkbox" className="accent-lime-400" /> Remember me</label>
          <Link className="text-neon" to="/forgot-password">Forgot Password?</Link>
        </div>
        <Button className="w-full" type="submit">Login</Button>
        <p className="pt-3 text-center text-xs text-text-dim">Protected by AForce Security Systems. © 2024</p>
      </form>
    </AuthShell>
  )
}

import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthShell } from './AuthShell'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { useAuthStore } from '../../store/authStore'

export function LoginPage() {
  const [email, setEmail] = useState('admin@aforce.com')
  const [password, setPassword] = useState('')
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
        <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
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

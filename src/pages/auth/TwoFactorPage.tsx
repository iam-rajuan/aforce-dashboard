import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthShell } from './AuthShell'
import { Button } from '../../components/ui/Button'

export function TwoFactorPage() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const navigate = useNavigate()

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    navigate('/authenticating')
    setTimeout(() => navigate('/dashboard'), 1200)
  }

  return (
    <AuthShell title="Two-Factor Authentication" subtitle="Enter verification code sent to your device.">
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="grid grid-cols-6 gap-2">
          {code.map((item, index) => (
            <input
              key={index}
              value={item}
              onChange={(event) => {
                const next = [...code]
                next[index] = event.target.value.slice(-1)
                setCode(next)
              }}
              className="h-12 rounded-lg border border-border bg-panel text-center text-xl text-white outline-none focus:border-neon"
            />
          ))}
        </div>
        <Button className="w-full" type="submit">Verify Identity</Button>
        <p className="text-center text-sm text-text-muted">Didn’t receive the code? <button type="button" className="text-neon">Resend Code</button></p>
      </form>
    </AuthShell>
  )
}

import { useMemo, useState } from 'react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { Table } from '../../components/ui/Table'
import { Toggle } from '../../components/ui/Toggle'
import { users as initialUsers } from '../../mock/data'
import type { User } from '../../types'

export function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<User | null>(null)
  const [editing, setEditing] = useState<User | null>(null)
  const [showBlock, setShowBlock] = useState(false)

  const filtered = useMemo(
    () => users.filter((user) => [user.name, user.email, user.id].join(' ').toLowerCase().includes(search.toLowerCase())),
    [users, search],
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <Input placeholder="Search by name, email, or ID..." value={search} onChange={(event) => setSearch(event.target.value)} />
        <Button variant="ghost">Status: All</Button>
        <Button variant="ghost">Subscription: All</Button>
      </div>

      <Table columns={['User', 'Hydration Score', 'Subscription', 'Status', 'Join Date', 'Actions']}>
        {filtered.map((user) => (
          <tr key={user.id} className="border-t border-border">
            <td className="px-4 py-3">
              <p className="font-semibold text-white">{user.name}</p>
              <p className="text-xs text-text-muted">{user.email}</p>
            </td>
            <td className="px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 rounded-full bg-slate-800"><div className="h-full rounded-full bg-neon" style={{ width: `${user.hydrationScore}%` }} /></div>
                {user.hydrationScore}%
              </div>
            </td>
            <td className="px-4 py-3"><Badge label={user.subscription.toUpperCase()} tone={user.subscription === 'Pro' || user.subscription === 'Enterprise' ? 'green' : 'blue'} /></td>
            <td className="px-4 py-3"><Badge label={user.status} tone={user.status === 'Active' ? 'green' : 'red'} /></td>
            <td className="px-4 py-3 text-text-muted">{user.joinDate}</td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <Button variant="ghost" className="h-9" onClick={() => setEditing(user)}>Edit</Button>
                <Button variant="danger" className="h-9" onClick={() => { setSelected(user); setShowBlock(true) }}>Block</Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <p className="text-sm text-text-dim">Showing 1-{filtered.length} of 3,420 users</p>

      <Modal isOpen={Boolean(editing)} onClose={() => setEditing(null)} title="Edit User" className="max-w-xl">
        {editing ? (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              setUsers((prev) => prev.map((entry) => (entry.id === editing.id ? editing : entry)))
              setEditing(null)
            }}
          >
            <Input label="Full Name" value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} />
            <Input label="Email Address" value={editing.email} onChange={(event) => setEditing({ ...editing, email: event.target.value })} />
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-text-muted">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Subscription Type</span>
                <select
                  value={editing.subscription}
                  onChange={(event) => setEditing({ ...editing, subscription: event.target.value as User['subscription'] })}
                  className="h-11 rounded-xl border border-border bg-panel px-3 text-white"
                >
                  <option>Free</option>
                  <option>Pro</option>
                  <option>Enterprise</option>
                </select>
              </label>
              <div className="grid gap-2 text-sm text-text-muted">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">User Status</span>
                <div className="flex h-11 items-center justify-between rounded-xl border border-border bg-panel px-3">
                  <span>{editing.status}</span>
                  <Toggle
                    checked={editing.status === 'Active'}
                    onChange={(next) => setEditing({ ...editing, status: next ? 'Active' : 'Blocked' })}
                  />
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-neon/20 bg-neon/10 p-3 text-sm text-text-muted">
              Changing the subscription type will immediately affect user premium access. User will be notified by email.
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" type="button" onClick={() => setEditing(null)}>Cancel</Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        ) : null}
      </Modal>

      <Modal isOpen={showBlock} onClose={() => setShowBlock(false)} title="Block this user?" className="max-w-md">
        <p className="text-text-muted">This will prevent the user from accessing the app. This action can be reversed in the settings panel.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowBlock(false)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => {
              if (selected) {
                setUsers((prev) => prev.map((entry) => (entry.id === selected.id ? { ...entry, status: 'Blocked' } : entry)))
              }
              setShowBlock(false)
            }}
          >
            Block User
          </Button>
        </div>
      </Modal>
    </div>
  )
}

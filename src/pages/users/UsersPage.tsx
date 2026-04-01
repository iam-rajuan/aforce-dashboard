import { AlertCircle, ChevronDown } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { Table } from '../../components/ui/Table'
import { Toggle } from '../../components/ui/Toggle'
import { useUsersStore } from '../../store/usersStore'
import type { SubscriptionType, User, UserStatus } from '../../types'

type UserDraft = {
  name: string
  email: string
  subscription: SubscriptionType
  status: UserStatus
}

const defaultDraft: UserDraft = {
  name: '',
  email: '',
  subscription: 'Pro',
  status: 'Active',
}

function UserFormModal({
  isOpen,
  title,
  submitLabel,
  draft,
  onClose,
  onDraftChange,
  onSubmit,
}: {
  isOpen: boolean
  title: string
  submitLabel: string
  draft: UserDraft
  onClose: () => void
  onDraftChange: (next: UserDraft) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {
  const isDisabled = !draft.name.trim() || !draft.email.trim()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className="max-w-[392px] rounded-[22px] border-[#30311d] bg-[#1d1d1c] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
    >
      <form className="-mx-6 -mb-5 mt-[-4px]" onSubmit={onSubmit}>
        <div className="space-y-4 px-5 pb-4 pt-2">
          <Input
            label="Full Name"
            value={draft.name}
            placeholder="Alex Rivera"
            onChange={(event) => onDraftChange({ ...draft, name: event.target.value })}
            className="h-11 rounded-[14px] border-[#363636] bg-[#2c2c2b] text-[15px] text-[#d7d7d7] placeholder:text-[#8c8c8b] focus:border-neon focus:ring-neon/15"
          />
          <Input
            label="Email Address"
            type="email"
            value={draft.email}
            placeholder="alex.rivera@example.com"
            onChange={(event) => onDraftChange({ ...draft, email: event.target.value })}
            className="h-11 rounded-[14px] border-[#363636] bg-[#2c2c2b] text-[15px] text-[#d7d7d7] placeholder:text-[#8c8c8b] focus:border-neon focus:ring-neon/15"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-[#90959c]">
              <span className="text-xs font-semibold text-[#7f8792]">Subscription Type</span>
              <div className="relative">
                <select
                  value={draft.subscription}
                  onChange={(event) => onDraftChange({ ...draft, subscription: event.target.value as SubscriptionType })}
                  className="h-11 w-full appearance-none rounded-[14px] border border-[#363636] bg-[#2c2c2b] px-4 pr-10 text-[15px] text-[#d7d7d7] outline-none transition focus:border-neon focus:ring-2 focus:ring-neon/15"
                >
                  <option>Free</option>
                  <option>Pro</option>
                  <option>Enterprise</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b5ff00]" />
              </div>
            </label>

            <div className="grid gap-2 text-sm text-[#90959c]">
              <span className="text-xs font-semibold text-[#7f8792]">User Status</span>
              <div className="flex h-11 items-center justify-between rounded-[14px] border border-[#363636] bg-[#2c2c2b] px-4">
                <span className="text-[15px] text-[#d7d7d7]">{draft.status}</span>
                <Toggle
                  checked={draft.status === 'Active'}
                  onChange={(next) => onDraftChange({ ...draft, status: next ? 'Active' : 'Blocked' })}
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-[14px] border border-[#425700] bg-[#232d13] px-3 py-3 text-[12px] leading-5 text-[#7f8792]">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#b5ff00]" />
            <p>Changing the subscription type will immediately affect the user&apos;s access to premium features. The user will be notified via email.</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 rounded-b-[22px] border-t border-[#313131] bg-[#2a2a29] px-5 py-4">
          <button type="button" onClick={onClose} className="px-4 text-sm font-semibold text-[#b8b8b8] transition hover:text-white">
            Cancel
          </button>
          <Button
            type="submit"
            disabled={isDisabled}
            className="h-11 min-w-32 rounded-[14px] bg-[#c6ff00] px-5 text-sm font-semibold text-black shadow-[0_0_22px_rgba(198,255,0,0.3)] hover:brightness-105"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export function UsersPage() {
  const users = useUsersStore((state) => state.users)
  const createUser = useUsersStore((state) => state.createUser)
  const updateUser = useUsersStore((state) => state.updateUser)
  const setUserStatus = useUsersStore((state) => state.setUserStatus)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<User | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showBlock, setShowBlock] = useState(false)
  const [createDraft, setCreateDraft] = useState<UserDraft>(defaultDraft)
  const [editDraft, setEditDraft] = useState<UserDraft>(defaultDraft)
  const [searchParams, setSearchParams] = useSearchParams()

  const filtered = useMemo(
    () => users.filter((user) => [user.name, user.email, user.id].join(' ').toLowerCase().includes(search.toLowerCase())),
    [users, search],
  )
  const isAddModalOpen = searchParams.get('modal') === 'add'
  const editing = useMemo(() => users.find((user) => user.id === editingId) ?? null, [editingId, users])

  useEffect(() => {
    if (editing) {
      setEditDraft({
        name: editing.name,
        email: editing.email,
        subscription: editing.subscription,
        status: editing.status,
      })
      return
    }

    setEditDraft(defaultDraft)
  }, [editing])

  const closeAddModal = () => {
    setCreateDraft(defaultDraft)
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      next.delete('modal')
      return next
    })
  }

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
                <div className="h-2 w-24 rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-neon" style={{ width: `${user.hydrationScore}%` }} />
                </div>
                {user.hydrationScore}%
              </div>
            </td>
            <td className="px-4 py-3">
              <Badge label={user.subscription.toUpperCase()} tone={user.subscription === 'Pro' || user.subscription === 'Enterprise' ? 'green' : 'blue'} />
            </td>
            <td className="px-4 py-3">
              <Badge label={user.status} tone={user.status === 'Active' ? 'green' : 'red'} />
            </td>
            <td className="px-4 py-3 text-text-muted">{user.joinDate}</td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <Button variant="ghost" className="h-9" onClick={() => setEditingId(user.id)}>Edit</Button>
                <Button
                  variant="danger"
                  className="h-9"
                  onClick={() => {
                    setSelected(user)
                    setShowBlock(true)
                  }}
                >
                  Block
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <p className="text-sm text-text-dim">Showing 1-{filtered.length} of 3,420 users</p>

      <UserFormModal
        isOpen={isAddModalOpen}
        title="Add User"
        submitLabel="Add User"
        draft={createDraft}
        onClose={closeAddModal}
        onDraftChange={setCreateDraft}
        onSubmit={(event) => {
          event.preventDefault()
          createUser(createDraft)
          closeAddModal()
        }}
      />

      <UserFormModal
        isOpen={Boolean(editing)}
        title="Edit User"
        submitLabel="Save Changes"
        draft={editDraft}
        onClose={() => setEditingId(null)}
        onDraftChange={setEditDraft}
        onSubmit={(event) => {
          event.preventDefault()
          if (!editing) return
          updateUser({ id: editing.id, ...editDraft })
          setEditingId(null)
        }}
      />

      <Modal isOpen={showBlock} onClose={() => setShowBlock(false)} title="Block this user?" className="max-w-md">
        <p className="text-text-muted">This will prevent the user from accessing the app. This action can be reversed in the settings panel.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowBlock(false)}>Cancel</Button>
          <Button
            variant="danger"
            onClick={() => {
              if (selected) {
                setUserStatus(selected.id, 'Blocked')
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

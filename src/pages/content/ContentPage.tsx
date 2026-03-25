import { useMemo, useState } from 'react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { Table } from '../../components/ui/Table'
import { Toggle } from '../../components/ui/Toggle'
import { contentItems as initialItems } from '../../mock/data'
import type { ContentItem } from '../../types'

const emptyItem: ContentItem = {
  id: '',
  title: '',
  subtitle: '',
  type: 'Video',
  category: 'Morning',
  status: 'Draft',
  createdAt: new Date().toDateString(),
}

export function ContentPage() {
  const [items, setItems] = useState(initialItems)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<ContentItem | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<ContentItem>(emptyItem)

  const filtered = useMemo(() => items.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())), [items, search])

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
        <Input placeholder="Search content title" value={search} onChange={(event) => setSearch(event.target.value)} />
        <Button variant="ghost">Type</Button>
        <Button variant="ghost">Status</Button>
        <Button variant="ghost">Category</Button>
      </div>

      <div className="flex gap-2">
        <Button className="h-9 px-3">All Content</Button>
        <Button variant="ghost" className="h-9 px-3">Videos</Button>
        <Button variant="ghost" className="h-9 px-3">Tips</Button>
        <Button variant="ghost" className="h-9 px-3">Articles</Button>
        <div className="ml-auto"><Button onClick={() => setAdding(true)}>+ Add Content</Button></div>
      </div>

      <Table columns={['Thumbnail', 'Title', 'Type', 'Category', 'Status', 'Date Created', 'Actions']}>
        {filtered.map((item) => (
          <tr key={item.id} className="border-t border-border">
            <td className="px-4 py-3"><div className="grid h-10 w-14 place-items-center rounded-lg bg-panel">🎬</div></td>
            <td className="px-4 py-3"><p className="font-semibold text-white">{item.title}</p><p className="text-xs text-text-muted">{item.subtitle}</p></td>
            <td className="px-4 py-3"><Badge label={item.type.toUpperCase()} tone="green" /></td>
            <td className="px-4 py-3 text-text-muted">{item.category}</td>
            <td className="px-4 py-3"><Badge label={item.status} tone={item.status === 'Published' ? 'green' : item.status === 'Draft' ? 'red' : 'gray'} /></td>
            <td className="px-4 py-3 text-text-muted">{item.createdAt}</td>
            <td className="px-4 py-3"><Button variant="ghost" className="h-9" onClick={() => setEditing(item)}>Edit</Button></td>
          </tr>
        ))}
      </Table>

      <div className="flex items-center justify-between text-sm text-text-dim"><p>Items per page: 20</p><p>Showing 1-20 of 244 items</p></div>

      <Modal isOpen={adding} onClose={() => setAdding(false)} title="New Content">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            setItems((prev) => [{ ...draft, id: `C-${Date.now()}` }, ...prev])
            setDraft(emptyItem)
            setAdding(false)
          }}
        >
          <Input label="Title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} required />
          <label className="grid gap-2 text-sm text-text-muted">
            <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Description</span>
            <textarea className="min-h-24 rounded-xl border border-border bg-panel p-3 text-white" />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-text-muted">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Category</span>
              <input className="h-11 rounded-xl border border-border bg-panel px-3 text-white" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} />
            </label>
            <div className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Status</span>
              <div className="flex h-11 items-center justify-between rounded-xl border border-border bg-panel px-3">
                <span className="text-sm text-text-muted">Published</span>
                <Toggle checked={draft.status === 'Published'} onChange={(next) => setDraft({ ...draft, status: next ? 'Published' : 'Draft' })} />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-border p-7 text-center text-text-muted">Click to upload or drag and drop PNG, JPG, PDF</div>
          <div className="flex justify-end gap-3"><Button variant="ghost" type="button" onClick={() => setAdding(false)}>Cancel</Button><Button type="submit">Save Changes</Button></div>
        </form>
      </Modal>

      <Modal isOpen={Boolean(editing)} onClose={() => setEditing(null)} title="Edit Content">
        {editing ? (
          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setItems((prev) => prev.map((item) => (item.id === editing.id ? editing : item))); setEditing(null) }}>
            <Input label="Title" value={editing.title} onChange={(event) => setEditing({ ...editing, title: event.target.value })} />
            <label className="grid gap-2 text-sm text-text-muted"><span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Description</span><textarea className="min-h-24 rounded-xl border border-border bg-panel p-3 text-white" defaultValue={editing.subtitle} /></label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-text-muted"><span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Category</span><input className="h-11 rounded-xl border border-border bg-panel px-3 text-white" value={editing.category} onChange={(event) => setEditing({ ...editing, category: event.target.value })} /></label>
              <div className="grid gap-2"><span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Status</span><div className="flex h-11 items-center justify-between rounded-xl border border-border bg-panel px-3"><span>Published</span><Toggle checked={editing.status === 'Published'} onChange={(next) => setEditing({ ...editing, status: next ? 'Published' : 'Draft' })} /></div></div>
            </div>
            <div className="rounded-xl border border-dashed border-border p-7 text-center text-text-muted">Upload Media</div>
            <div className="flex justify-end gap-3"><Button variant="ghost" type="button" onClick={() => setEditing(null)}>Cancel</Button><Button type="submit">Save Changes</Button></div>
          </form>
        ) : null}
      </Modal>
    </div>
  )
}

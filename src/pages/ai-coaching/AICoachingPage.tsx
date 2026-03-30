import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { ArrowLeft, Eye, FilePenLine, ImageIcon, MoreVertical, Search, Upload, Video } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { Toggle } from '../../components/ui/Toggle'
import { contentItems as initialItems } from '../../mock/data'
import type { ContentItem } from '../../types'

type CoachingView = 'library' | 'upload'
type ContentFilter = 'All Content' | 'Videos' | 'Tips' | 'Articles'

interface CoachingDraft {
  title: string
  description: string
  type: ContentItem['type']
  category: string
  status: ContentItem['status']
  duration: string
  publishToApp: boolean
  fileName: string
  fileSize: string
}

const emptyDraft: CoachingDraft = {
  title: '',
  description: '',
  type: 'Video',
  category: 'Recovery',
  status: 'Published',
  duration: '',
  publishToApp: true,
  fileName: '',
  fileSize: '',
}

const typeToneMap: Record<ContentItem['type'], 'green' | 'yellow' | 'blue'> = {
  Video: 'green',
  Article: 'yellow',
  Tip: 'blue',
}

const statusToneMap: Record<ContentItem['status'], 'green' | 'red' | 'gray'> = {
  Published: 'green',
  Draft: 'red',
  Archived: 'gray',
}

function formatBytes(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

function mapContentToDraft(item: ContentItem): CoachingDraft {
  return {
    title: item.title,
    description: item.subtitle ?? '',
    type: item.type,
    category: item.category,
    status: item.status,
    duration: item.type === 'Video' ? '08:42' : '05:00',
    publishToApp: item.status === 'Published',
    fileName: item.thumbnail ?? '',
    fileSize: item.thumbnail ? '2.4 MB' : '',
  }
}

export function AICoachingPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [items, setItems] = useState<ContentItem[]>(initialItems)
  const [search, setSearch] = useState('')
  const [contentFilter, setContentFilter] = useState<ContentFilter>('All Content')
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [editDraft, setEditDraft] = useState<CoachingDraft>(emptyDraft)
  const [newDraft, setNewDraft] = useState<CoachingDraft>(emptyDraft)
  const view: CoachingView = searchParams.get('mode') === 'upload' ? 'upload' : 'library'

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = [item.title, item.subtitle, item.category, item.type].join(' ').toLowerCase().includes(search.toLowerCase())
      const matchesFilter =
        contentFilter === 'All Content' ||
        (contentFilter === 'Videos' && item.type === 'Video') ||
        (contentFilter === 'Tips' && item.type === 'Tip') ||
        (contentFilter === 'Articles' && item.type === 'Article')

      return matchesSearch && matchesFilter
    })
  }, [items, search, contentFilter])

  const stats = useMemo(() => {
    const published = items.filter((item) => item.status === 'Published').length
    const videos = items.filter((item) => item.type === 'Video').length
    const drafts = items.filter((item) => item.status === 'Draft').length

    return [
      { label: 'Total Content', value: items.length.toString().padStart(2, '0'), tone: 'green' as const },
      { label: 'Live in App', value: published.toString().padStart(2, '0'), tone: 'green' as const },
      { label: 'Coaching Videos', value: videos.toString().padStart(2, '0'), tone: 'blue' as const },
      { label: 'Draft Queue', value: drafts.toString().padStart(2, '0'), tone: 'yellow' as const },
    ]
  }, [items])

  const openEditModal = (item: ContentItem) => {
    setEditingItem(item)
    setEditDraft(mapContentToDraft(item))
  }

  const handleUploadSelection = (event: ChangeEvent<HTMLInputElement>, mode: 'create' | 'edit') => {
    const file = event.target.files?.[0]
    if (!file) return

    const payload = {
      fileName: file.name,
      fileSize: formatBytes(file.size),
      type: file.type.startsWith('video') ? ('Video' as const) : mode === 'create' ? newDraft.type : editDraft.type,
    }

    if (mode === 'create') {
      setNewDraft((current) => ({ ...current, ...payload }))
      return
    }

    setEditDraft((current) => ({ ...current, ...payload }))
  }

  const createContent = (event: FormEvent) => {
    event.preventDefault()

    const createdItem: ContentItem = {
      id: `C-${Date.now()}`,
      title: newDraft.title,
      subtitle: newDraft.description || `${newDraft.duration || 'New'} ${newDraft.type.toLowerCase()} content`,
      type: newDraft.type,
      category: newDraft.category,
      status: newDraft.publishToApp ? 'Published' : 'Draft',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      thumbnail: newDraft.fileName,
    }

    setItems((current) => [createdItem, ...current])
    setNewDraft(emptyDraft)
    navigate('/ai-coaching')
  }

  const saveEditedContent = (event: FormEvent) => {
    event.preventDefault()
    if (!editingItem) return

    setItems((current) =>
      current.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              title: editDraft.title,
              subtitle: editDraft.description,
              type: editDraft.type,
              category: editDraft.category,
              status: editDraft.publishToApp ? 'Published' : editDraft.status === 'Archived' ? 'Archived' : 'Draft',
              thumbnail: editDraft.fileName || item.thumbnail,
            }
          : item,
      ),
    )
    setEditingItem(null)
  }

  return (
    <div className="grid gap-6">
      {view === 'library' ? (
        <>
          <section className="grid gap-4 xl:grid-cols-4">
            {stats.map((item, index) => (
              <Card key={item.label} className={index === 0 ? 'bg-[linear-gradient(135deg,rgba(198,255,0,0.14),rgba(14,18,24,1)_52%)]' : undefined}>
                <p className="text-sm text-text-dim">{item.label}</p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-4xl font-bold text-white">{item.value}</p>
                  <Badge label={item.label === 'Draft Queue' ? 'Needs review' : 'Healthy'} tone={item.tone} />
                </div>
              </Card>
            ))}
          </section>

          <Card
            title="Content Management"
            subtitle="Manage hydration coaching videos, articles, and tips in one clean publishing workflow."
            action={
              <Button
                className="px-5"
                onClick={() => {
                  setNewDraft(emptyDraft)
                  navigate('/ai-coaching?mode=upload')
                }}
              >
                + Add Content
              </Button>
            }
          >
            <div className="grid gap-4">
              <div className="grid gap-3 xl:grid-cols-[1fr_auto_auto_auto]">
                <div className="flex h-12 items-center gap-3 rounded-2xl border border-border bg-panel px-4 text-text-muted">
                  <Search className="h-4 w-4" />
                  <input
                    className="w-full bg-transparent text-sm outline-none"
                    placeholder="Search content title"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
                <Button variant="ghost" className="px-4">
                  Type
                </Button>
                <Button variant="ghost" className="px-4">
                  Status
                </Button>
                <Button variant="ghost" className="px-4">
                  Category
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {(['All Content', 'Videos', 'Tips', 'Articles'] as ContentFilter[]).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`h-9 rounded-full px-4 text-xs font-semibold uppercase tracking-wide transition ${
                      contentFilter === filter ? 'bg-neon text-black shadow-neon' : 'border border-border bg-panel text-text-muted hover:text-white'
                    }`}
                    onClick={() => setContentFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="overflow-hidden rounded-[28px] border border-border bg-card">
                <div className="grid grid-cols-[110px_1.6fr_0.8fr_0.8fr_0.9fr_0.9fr_90px] gap-3 border-b border-border bg-panel px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-dim">
                  <span>Thumbnail</span>
                  <span>Title</span>
                  <span>Type</span>
                  <span>Category</span>
                  <span>Status</span>
                  <span>Date Created</span>
                  <span className="text-right">Actions</span>
                </div>

                <div>
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[110px_1.6fr_0.8fr_0.8fr_0.9fr_0.9fr_90px] gap-3 border-b border-border px-5 py-4 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <div className="grid h-14 w-16 place-items-center rounded-2xl bg-[radial-gradient(circle_at_top,#78a390,#24313d_65%)] text-neon">
                          {item.type === 'Video' ? <Video className="h-5 w-5" /> : <ImageIcon className="h-5 w-5" />}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold leading-tight text-white">{item.title}</p>
                        <p className="mt-1 truncate text-sm text-text-muted">{item.subtitle}</p>
                      </div>
                      <div className="flex items-center">
                        <Badge label={item.type.toUpperCase()} tone={typeToneMap[item.type]} />
                      </div>
                      <div className="flex items-center text-sm text-text-muted">{item.category}</div>
                      <div className="flex items-center">
                        <Badge label={item.status} tone={statusToneMap[item.status]} />
                      </div>
                      <div className="flex items-center text-sm text-text-muted">{item.createdAt}</div>
                      <div className="flex items-center justify-end gap-2">
                        <button type="button" className="rounded-full border border-border bg-panel p-2 text-text-muted transition hover:text-white">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-border bg-panel p-2 text-text-muted transition hover:text-white"
                          onClick={() => openEditModal(item)}
                        >
                          <FilePenLine className="h-4 w-4" />
                        </button>
                        <button type="button" className="rounded-full border border-border bg-panel p-2 text-text-muted transition hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-[#0e1218] px-5 py-4 text-sm text-text-dim">
                  <div className="flex items-center gap-2">
                    <span>Items per page:</span>
                    <button type="button" className="rounded-full border border-border bg-panel px-3 py-1.5 text-white">
                      20
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <button type="button" className="rounded-full border border-border bg-panel px-3 py-1">
                      1
                    </button>
                    <span className="text-text-dim">2</span>
                    <span className="text-text-dim">3</span>
                    <span className="text-text-dim">...</span>
                    <span className="text-text-dim">12</span>
                  </div>
                  <p>Showing 1-{filteredItems.length} of {items.length} items</p>
                </div>
              </div>
            </div>
          </Card>
        </>
      ) : (
        <Card
          title="Upload Coaching Video"
          subtitle="Create new hydration coaching content and publish it directly into the app experience."
          action={
            <Button variant="ghost" className="px-4" onClick={() => navigate('/ai-coaching')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Content
            </Button>
          }
        >
          <form className="grid gap-5" onSubmit={createContent}>
            <Input
              label="Video Title"
              placeholder="Post-Workout Hydration Recovery"
              value={newDraft.title}
              onChange={(event) => setNewDraft((current) => ({ ...current, title: event.target.value }))}
              required
            />

            <label className="grid gap-2 text-sm text-text-muted">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Description</span>
              <textarea
                className="min-h-28 rounded-2xl border border-border bg-panel px-4 py-3 text-white outline-none transition focus:border-neon focus:ring-2 focus:ring-neon/20"
                placeholder="Enter video description..."
                maxLength={300}
                value={newDraft.description}
                onChange={(event) => setNewDraft((current) => ({ ...current, description: event.target.value }))}
              />
              <span className="justify-self-end text-xs text-text-dim">{newDraft.description.length}/300</span>
            </label>

            <label className="grid gap-2 text-sm text-text-muted">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Video File</span>
              <div className="rounded-[24px] border border-dashed border-border bg-[linear-gradient(180deg,#1a222d,#161d27)] p-8 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-neon/10 text-neon">
                  <Upload className="h-7 w-7" />
                </div>
                <p className="mt-5 text-xl font-semibold text-white">Drag &amp; Drop Video Here</p>
                <p className="mt-2 text-sm text-text-muted">MP4, MOV, max 200MB</p>
                <label className="mt-5 inline-flex h-10 cursor-pointer items-center rounded-xl border border-neon/20 bg-black/20 px-4 text-sm font-semibold text-neon">
                  Browse Files
                  <input
                    type="file"
                    accept="video/mp4,video/quicktime,image/png,image/jpeg"
                    className="hidden"
                    onChange={(event) => handleUploadSelection(event, 'create')}
                  />
                </label>
                {newDraft.fileName ? (
                  <div className="mt-5 rounded-2xl border border-border bg-panel px-4 py-3 text-left">
                    <p className="font-semibold text-white">{newDraft.fileName}</p>
                    <p className="text-sm text-text-muted">{newDraft.fileSize || 'Ready to upload'}</p>
                  </div>
                ) : null}
              </div>
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-text-muted">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Video Category</span>
                <select
                  className="h-11 rounded-xl border border-border bg-panel px-3 text-white outline-none transition focus:border-neon"
                  value={newDraft.category}
                  onChange={(event) => setNewDraft((current) => ({ ...current, category: event.target.value }))}
                >
                  <option>Recovery</option>
                  <option>Morning</option>
                  <option>Workout</option>
                  <option>Nutrition</option>
                </select>
              </label>

              <Input
                label="Video Duration"
                placeholder="08:42"
                value={newDraft.duration}
                onChange={(event) => setNewDraft((current) => ({ ...current, duration: event.target.value }))}
              />
            </div>

            <div className="rounded-2xl border border-border bg-panel p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">Publish to App</p>
                  <p className="text-sm text-text-muted">Make this video visible to all users immediately after upload</p>
                </div>
                <Toggle checked={newDraft.publishToApp} onChange={(next) => setNewDraft((current) => ({ ...current, publishToApp: next }))} />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => navigate('/ai-coaching')}>
                Cancel
              </Button>
              <Button type="submit">Publish Video</Button>
            </div>
          </form>
        </Card>
      )}

      <Modal isOpen={Boolean(editingItem)} onClose={() => setEditingItem(null)} title="Edit Content" className="max-w-3xl">
        {editingItem ? (
          <form className="space-y-5" onSubmit={saveEditedContent}>
            <Input
              label="Title"
              value={editDraft.title}
              onChange={(event) => setEditDraft((current) => ({ ...current, title: event.target.value }))}
              required
            />

            <label className="grid gap-2 text-sm text-text-muted">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Description</span>
              <textarea
                className="min-h-28 rounded-2xl border border-border bg-panel px-4 py-3 text-white outline-none transition focus:border-neon focus:ring-2 focus:ring-neon/20"
                value={editDraft.description}
                onChange={(event) => setEditDraft((current) => ({ ...current, description: event.target.value }))}
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-text-muted">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Category</span>
                <select
                  className="h-11 rounded-xl border border-border bg-panel px-3 text-white outline-none transition focus:border-neon"
                  value={editDraft.category}
                  onChange={(event) => setEditDraft((current) => ({ ...current, category: event.target.value }))}
                >
                  <option>Recovery</option>
                  <option>Morning</option>
                  <option>Workout</option>
                  <option>Nutrition</option>
                </select>
              </label>

              <div className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Status</span>
                <div className="flex h-11 items-center justify-between rounded-xl border border-border bg-panel px-4">
                  <span className="text-sm text-white">Published</span>
                  <Toggle checked={editDraft.publishToApp} onChange={(next) => setEditDraft((current) => ({ ...current, publishToApp: next }))} />
                </div>
              </div>
            </div>

            <label className="grid gap-2 text-sm text-text-muted">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Upload Media</span>
              <div className="rounded-[24px] border border-dashed border-[#33435a] bg-panel p-8 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#223049] text-neon">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="mt-5 text-xl font-semibold text-white">Click to upload or drag and drop</p>
                <p className="mt-2 text-sm text-text-muted">PNG, JPG or PDF (max. 10MB)</p>
                <label className="mt-5 inline-flex h-10 cursor-pointer items-center rounded-xl border border-neon/20 bg-black/20 px-4 text-sm font-semibold text-neon">
                  Select File
                  <input
                    type="file"
                    accept="image/png,image/jpeg,application/pdf,video/mp4,video/quicktime"
                    className="hidden"
                    onChange={(event) => handleUploadSelection(event, 'edit')}
                  />
                </label>
              </div>
            </label>

            {editDraft.fileName ? (
              <div className="flex items-center justify-between rounded-2xl border border-border bg-[#1a2230] px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-neon/10 text-neon">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{editDraft.fileName}</p>
                    <p className="text-sm text-text-muted">{editDraft.fileSize || 'Media attached'}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm font-semibold text-text-muted transition hover:text-white"
                  onClick={() => setEditDraft((current) => ({ ...current, fileName: '', fileSize: '' }))}
                >
                  Remove
                </button>
              </div>
            ) : null}

            <div className="flex justify-end gap-3 border-t border-border pt-5">
              <Button variant="ghost" type="button" onClick={() => setEditingItem(null)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        ) : null}
      </Modal>
    </div>
  )
}

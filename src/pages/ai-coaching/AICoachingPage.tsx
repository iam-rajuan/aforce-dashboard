import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Toggle } from '../../components/ui/Toggle'

export function AICoachingPage() {
  const [publish, setPublish] = useState(true)

  return (
    <div className="grid gap-6">
      <Card title="Upload Coaching Video">
        <form className="grid gap-4">
          <Input label="Video Title" placeholder="Post-Workout Hydration Recovery" />
          <label className="grid gap-2 text-sm text-text-muted">
            <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Description</span>
            <textarea className="min-h-24 rounded-xl border border-border bg-panel p-3 text-white" placeholder="Enter video description..." maxLength={300} />
          </label>
          <div className="rounded-2xl border border-dashed border-border p-10 text-center text-text-muted">
            <p className="text-lg font-semibold text-white">Drag & Drop Video Here</p>
            <p>MP4, MOV, max 200MB</p>
            <Button type="button" variant="ghost" className="mt-4">Browse Files</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-text-muted">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Video Category</span>
              <select className="h-11 rounded-xl border border-border bg-panel px-3 text-white">
                <option>Recovery</option>
                <option>Morning</option>
                <option>Workout</option>
              </select>
            </label>
            <Input label="Video Duration" placeholder="--:--" />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border bg-panel p-4">
            <div>
              <p className="text-sm font-semibold text-white">Publish to App</p>
              <p className="text-sm text-text-muted">Make this video visible to all users immediately after upload</p>
            </div>
            <Toggle checked={publish} onChange={setPublish} />
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost">Cancel</Button>
            <Button type="button">Publish Video</Button>
          </div>
        </form>
      </Card>

      <Card title="No content created yet." subtitle="Start building your hydration coaching library by uploading your first resource or training module.">
        <div className="flex flex-wrap gap-3">
          <Button>Upload First Content</Button>
          <Button variant="ghost">View Tutorials</Button>
          <Button variant="ghost">Use Templates</Button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-panel p-4 text-text-muted"><p className="font-semibold text-white">Video Lessons</p><p>Upload MP4, MOV, or link YouTube/Vimeo.</p></div>
          <div className="rounded-xl border border-border bg-panel p-4 text-text-muted"><p className="font-semibold text-white">Guides & PDF</p><p>Nutrition plans and hydration schedules.</p></div>
          <div className="rounded-xl border border-border bg-panel p-4 text-text-muted"><p className="font-semibold text-white">Quizzes</p><p>Assess client knowledge and progress.</p></div>
        </div>
      </Card>
    </div>
  )
}

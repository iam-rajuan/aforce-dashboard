import { Bell, CheckCircle2, Clock3, Send, ShieldAlert } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'

const stats = [
  { label: 'Queued', value: '18', detail: 'Messages waiting for release', icon: Clock3 },
  { label: 'Delivered Today', value: '12,480', detail: 'Across in-app, email, and SMS', icon: CheckCircle2 },
  { label: 'Requires Review', value: '07', detail: 'Escalated notifications', icon: ShieldAlert },
]

const recentNotifications = [
  { title: 'Maintenance notice', audience: 'All admins', status: 'Delivered', time: '5 min ago' },
  { title: 'Billing renewal reminder', audience: 'Enterprise accounts', status: 'Scheduled', time: 'Today, 4:00 PM' },
  { title: 'Security verification request', audience: 'Regional managers', status: 'Draft', time: 'Pending approval' },
  { title: 'Weekly AI insight digest', audience: 'All subscribers', status: 'Delivered', time: 'Yesterday, 9:30 AM' },
]

const channelHealth = [
  { label: 'In-app', value: '98%', width: '98%', tone: 'bg-neon' },
  { label: 'Email', value: '91%', width: '91%', tone: 'bg-blue-300' },
  { label: 'SMS', value: '84%', width: '84%', tone: 'bg-slate-400' },
]

const rules = [
  { title: 'Billing reminders', body: 'Send renewal reminders 7 days and 24 hours before plan expiration.' },
  { title: 'Security events', body: 'Escalate suspicious login activity to the admin response queue.' },
  { title: 'Content updates', body: 'Notify subscribers when new coaching content is published.' },
]

function toneForStatus(status: string): 'green' | 'yellow' | 'gray' {
  if (status === 'Delivered') return 'green'
  if (status === 'Scheduled') return 'yellow'
  return 'gray'
}

export function NotificationsPage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 lg:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.label} className="rounded-[20px] bg-[#10151d]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-text-dim">{item.label}</p>
                  <p className="mt-2 text-4xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-text-muted">{item.detail}</p>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-neon/10 text-neon">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Compose Notification" subtitle="Prepare a new message for your selected audience." className="rounded-[20px] bg-[#10151d]">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Title" defaultValue="Platform maintenance notice" />
              <Input placeholder="Audience" defaultValue="All administrators" />
            </div>
            <label className="grid gap-2 text-sm text-text-muted">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Message</span>
              <textarea
                className="min-h-36 rounded-2xl border border-border bg-panel px-4 py-3 text-white outline-none transition focus:border-neon focus:ring-2 focus:ring-neon/20"
                defaultValue="We will perform scheduled maintenance tonight between 11:00 PM and 11:30 PM UTC. Admin access may be briefly unavailable during this period."
              />
            </label>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-panel p-4">
                <p className="text-sm font-semibold text-white">Delivery Channels</p>
                <p className="mt-2 text-sm text-text-muted">In-app, email</p>
              </div>
              <div className="rounded-2xl border border-border bg-panel p-4">
                <p className="text-sm font-semibold text-white">Send Time</p>
                <p className="mt-2 text-sm text-text-muted">Today, 4:00 PM</p>
              </div>
              <div className="rounded-2xl border border-border bg-panel p-4">
                <p className="text-sm font-semibold text-white">Recipients</p>
                <p className="mt-2 text-sm text-text-muted">18,000 users</p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost">Save Draft</Button>
              <Button className="px-5">
                <Send className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card title="Channel Health" subtitle="Current delivery success rates." className="rounded-[20px] bg-[#10151d]">
            <div className="space-y-4">
              {channelHealth.map((channel) => (
                <div key={channel.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-text-muted">{channel.label}</span>
                    <span className="text-white">{channel.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#0b1118]">
                    <div className={`h-full rounded-full ${channel.tone}`} style={{ width: channel.width }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Active Rules" subtitle="Core notification automations." className="rounded-[20px] bg-[#10151d]">
            <div className="space-y-3">
              {rules.map((rule) => (
                <div key={rule.title} className="rounded-2xl border border-border bg-panel p-4">
                  <div className="flex items-start gap-3">
                    <Bell className="mt-0.5 h-4 w-4 text-neon" />
                    <div>
                      <p className="font-semibold text-white">{rule.title}</p>
                      <p className="mt-1 text-sm text-text-muted">{rule.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <Card title="Recent Activity" subtitle="Latest notification deliveries and drafts." className="rounded-[20px] bg-[#10151d]">
        <div className="space-y-3">
          {recentNotifications.map((item) => (
            <div key={item.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-panel px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="text-sm text-text-muted">{item.audience}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge label={item.status} tone={toneForStatus(item.status)} />
                <span className="text-sm text-text-dim">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

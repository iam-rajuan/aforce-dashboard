import { Bell, CheckCircle2, Clock3, Send, ShieldAlert } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

const notificationStats = [
  { label: 'Queued Alerts', value: '18', tone: 'yellow' as const, icon: Clock3 },
  { label: 'Delivered Today', value: '12,480', tone: 'green' as const, icon: CheckCircle2 },
  { label: 'Escalations', value: '07', tone: 'red' as const, icon: ShieldAlert },
]

const recentNotifications = [
  { title: 'Maintenance notice', audience: 'All admins', status: 'Delivered', time: '5 min ago' },
  { title: 'Billing renewal reminder', audience: 'Enterprise accounts', status: 'Scheduled', time: 'Today, 4:00 PM' },
  { title: 'Security verification request', audience: 'Regional managers', status: 'Draft', time: 'Pending approval' },
  { title: 'Weekly AI insight digest', audience: 'All subscribers', status: 'Delivered', time: 'Yesterday, 9:30 AM' },
]

export function NotificationsPage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-3">
        {notificationStats.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.label}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-text-dim">{item.label}</p>
                  <p className="mt-2 text-5xl font-bold text-white">{item.value}</p>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-neon/10 text-neon">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          )
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card title="Recent Notifications" subtitle="Live delivery feed across the admin platform">
          <div className="space-y-3">
            {recentNotifications.map((item) => (
              <div key={item.title} className="flex flex-col gap-3 rounded-2xl border border-border bg-panel p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-text-muted">{item.audience}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    label={item.status}
                    tone={item.status === 'Delivered' ? 'green' : item.status === 'Scheduled' ? 'yellow' : 'gray'}
                  />
                  <span className="text-sm text-text-dim">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          <Card title="Broadcast Summary">
            <div className="rounded-2xl border border-neon/20 bg-neon/10 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-black/30 text-neon">
                  <Send className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Next platform push</p>
                  <p className="text-sm text-text-muted">18,000 recipients scheduled for 4:00 PM</p>
                </div>
              </div>
              <Button className="mt-4 w-full">Review Campaign</Button>
            </div>
          </Card>

          <Card title="Channel Health">
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-text-muted">In-app</span>
                  <span className="text-neon">98%</span>
                </div>
                <div className="h-2 rounded-full bg-[#0b1118]">
                  <div className="h-full w-[98%] rounded-full bg-neon" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-text-muted">Email</span>
                  <span className="text-white">91%</span>
                </div>
                <div className="h-2 rounded-full bg-[#0b1118]">
                  <div className="h-full w-[91%] rounded-full bg-white/60" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-text-muted">SMS</span>
                  <span className="text-white">84%</span>
                </div>
                <div className="h-2 rounded-full bg-[#0b1118]">
                  <div className="h-full w-[84%] rounded-full bg-slate-500" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Card title="Notification Rules" subtitle="Automation triggers and delivery coverage">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-panel p-4">
            <Bell className="h-5 w-5 text-neon" />
            <p className="mt-3 font-semibold text-white">Product updates</p>
            <p className="mt-2 text-sm text-text-muted">Auto-send release notes when new features go live.</p>
          </div>
          <div className="rounded-2xl border border-border bg-panel p-4">
            <Clock3 className="h-5 w-5 text-neon" />
            <p className="mt-3 font-semibold text-white">Billing reminders</p>
            <p className="mt-2 text-sm text-text-muted">Notify plan owners 7 days and 24 hours before renewal.</p>
          </div>
          <div className="rounded-2xl border border-border bg-panel p-4">
            <ShieldAlert className="h-5 w-5 text-neon" />
            <p className="mt-3 font-semibold text-white">Security events</p>
            <p className="mt-2 text-sm text-text-muted">Escalate failed login spikes to the admin response team.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

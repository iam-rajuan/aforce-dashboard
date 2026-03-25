import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { hydrationTrend } from '../../mock/data'

const stats = [
  { title: 'Total Users', value: '58,421', trend: '+8.2%' },
  { title: 'Daily Hydration Avg', value: '2.4L', trend: 'Optimal' },
  { title: 'Revenue', value: '$124,580', trend: '+12.5%' },
]

export function DashboardPage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <p className="text-sm text-text-dim">{stat.title}</p>
            <div className="mt-2 flex items-center gap-2">
              <p className="text-5xl font-bold text-white">{stat.value}</p>
              <Badge label={stat.trend} tone="green" />
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card title="Hydration Score Trends" subtitle="Aggregated health performance metrics">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hydrationTrend}>
                <defs>
                  <linearGradient id="neonFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c6ff00" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#c6ff00" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1f2632" vertical={false} />
                <XAxis dataKey="day" stroke="#6a7a91" />
                <YAxis stroke="#6a7a91" />
                <Tooltip />
                <Area type="monotone" dataKey="hydration" stroke="#c6ff00" fill="url(#neonFill)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card title="AI Insights">
            <div className="space-y-3">
              <div className="rounded-xl border border-neon/20 bg-neon/10 p-3 text-sm text-text-muted">Users average hydration score increased <span className="text-neon">6%</span> this week.</div>
              <div className="rounded-xl border border-border bg-panel p-3 text-sm text-text-muted">Peak hydration activity detected between 8:00 AM - 10:00 AM.</div>
              <div className="rounded-xl border border-border bg-panel p-3 text-sm text-text-muted">12% drop in weekend retention for European cohort.</div>
            </div>
          </Card>
          <Card title="Subscription Plan">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Enterprise</span>
              <span className="text-neon">Active</span>
            </div>
            <p className="mt-3 text-sm text-text-muted">Storage Used 1.2 TB / 2 TB</p>
            <div className="mt-3 h-2 rounded-full bg-slate-800">
              <div className="h-full w-3/5 rounded-full bg-neon" />
            </div>
          </Card>
        </div>
      </section>

      <Card title="Daily vs Weekly Performance">
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hydrationTrend}>
              <CartesianGrid stroke="#1f2632" />
              <XAxis dataKey="day" stroke="#6a7a91" />
              <YAxis stroke="#6a7a91" />
              <Tooltip />
              <Line type="monotone" dataKey="hydration" stroke="#c6ff00" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="previous" stroke="#7b8ba6" strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

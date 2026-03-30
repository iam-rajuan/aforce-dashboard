import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Clock3, Droplets, Lightbulb, TrendingUp, TriangleAlert, Users, Wallet } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

type TrendView = 'Daily' | 'Weekly' | 'Monthly'

const trendSeries: Record<TrendView, { day: string; hydration: number }[]> = {
  Daily: [
    { day: 'Mon', hydration: 46 },
    { day: 'Tue', hydration: 54 },
    { day: 'Wed', hydration: 66 },
    { day: 'Thu', hydration: 79 },
    { day: 'Fri', hydration: 77 },
    { day: 'Sat', hydration: 57 },
    { day: 'Sun', hydration: 69 },
  ],
  Weekly: [
    { day: 'Mon', hydration: 41 },
    { day: 'Tue', hydration: 52 },
    { day: 'Wed', hydration: 68 },
    { day: 'Thu', hydration: 83 },
    { day: 'Fri', hydration: 80 },
    { day: 'Sat', hydration: 59 },
    { day: 'Sun', hydration: 72 },
  ],
  Monthly: [
    { day: 'Mon', hydration: 38 },
    { day: 'Tue', hydration: 49 },
    { day: 'Wed', hydration: 61 },
    { day: 'Thu', hydration: 74 },
    { day: 'Fri', hydration: 78 },
    { day: 'Sat', hydration: 63 },
    { day: 'Sun', hydration: 70 },
  ],
}

const insightContent: Record<TrendView, { title: string; body: string; tone: 'green' | 'gray' }[]> = {
  Daily: [
    { title: 'Live uplift', body: 'Users average hydration score increased 6% in the last 24 hours.', tone: 'green' },
    { title: 'Peak window', body: 'Peak hydration activity detected between 8:00 AM and 10:00 AM.', tone: 'gray' },
    { title: 'Retention watch', body: '12% drop in weekend retention for European cohort.', tone: 'gray' },
  ],
  Weekly: [
    { title: 'Weekly momentum', body: 'Weekly hydration completion rate climbed 8.2% across active users.', tone: 'green' },
    { title: 'Strongest segment', body: 'Morning coaching videos drove the highest engagement this week.', tone: 'gray' },
    { title: 'Churn signal', body: 'Recovery plan users show softer Sunday return behavior.', tone: 'gray' },
  ],
  Monthly: [
    { title: 'Monthly growth', body: 'Monthly platform adherence improved by 11% over the prior period.', tone: 'green' },
    { title: 'Content lift', body: 'Article-based hydration tips outperformed baseline by 14%.', tone: 'gray' },
    { title: 'Follow-up need', body: 'Enterprise weekend engagement still trails weekday performance.', tone: 'gray' },
  ],
}

const trendTabs: TrendView[] = ['Daily', 'Weekly', 'Monthly']

export function DashboardPage() {
  const [trendView, setTrendView] = useState<TrendView>('Weekly')

  const stats = useMemo(
    () => [
      {
        title: 'Total Users',
        value: '58,421',
        trend: '+8.2%',
        detail: 'New accounts accelerated over the last 30 days.',
        icon: Users,
        accent: 'progress',
      },
      {
        title: 'Daily Hydration Avg',
        value: '2.4L',
        trend: 'OPTIMAL',
        detail: 'Based on active cohort of 12,402 users.',
        icon: Droplets,
        accent: 'pill' as const,
      },
      {
        title: 'Revenue',
        value: '$124,580',
        trend: '+12.5%',
        detail: 'Recurring subscription billing remains ahead of target.',
        icon: Wallet,
        accent: 'bars' as const,
      },
    ],
    [],
  )

  const chartData = trendSeries[trendView]
  const activeInsights = insightContent[trendView]

  return (
    <div className="grid gap-7">
      <section className="grid gap-4 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <section
              key={stat.title}
              className="rounded-[28px] border border-border bg-[linear-gradient(180deg,#11161f,#0d1218)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-text-dim">{stat.title}</p>
                  <div className="mt-5 flex items-end gap-3">
                    <p className="text-5xl font-bold tracking-tight text-white">{stat.value}</p>
                    {stat.title === 'Daily Hydration Avg' ? (
                      <Badge label={stat.trend} tone="green" />
                    ) : (
                      <p className="pb-2 text-sm font-semibold text-neon">{stat.trend}</p>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-text-dim">{stat.detail}</p>
                </div>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-neon/10 text-neon">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              {stat.accent === 'progress' ? (
                <div className="mt-6 rounded-[10px] bg-[linear-gradient(90deg,rgba(198,255,0,0.18),rgba(198,255,0,0.06))] p-1">
                  <div className="h-2 w-[74%] rounded-full bg-neon shadow-[0_0_18px_rgba(198,255,0,0.45)]" />
                </div>
              ) : null}

              {stat.accent === 'pill' ? (
                <div className="mt-6 inline-flex items-center rounded-full bg-[#2b3415] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neon">
                  <span className="mr-2 h-2 w-2 rounded-full bg-neon" />
                  Optimal
                </div>
              ) : null}

              {stat.accent === 'bars' ? (
                <div className="mt-6 flex items-end gap-1">
                  {[24, 28, 30, 34, 41, 39, 26].map((height, index) => (
                    <div
                      key={height}
                      className={`h-2 rounded-full ${index >= 4 ? 'bg-neon' : 'bg-[#2b3444]'}`}
                      style={{ width: `${height}px` }}
                    />
                  ))}
                </div>
              ) : null}
            </section>
          )
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_320px]">
        <Card
          title="Hydration Score Trends"
          subtitle="Aggregated health performance metrics"
          action={
            <div className="flex rounded-full border border-border bg-[#121926] p-1">
              {trendTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    trendView === tab ? 'bg-[#24314a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]' : 'text-text-dim hover:text-white'
                  }`}
                  onClick={() => setTrendView(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          }
          className="rounded-[30px] p-6"
        >
          <div className="relative h-[500px]">
            <div className="absolute right-[24%] top-[18%] z-10 hidden h-3 w-3 rounded-full bg-neon shadow-[0_0_18px_rgba(198,255,0,0.85)] lg:block" />
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 30, right: 12, left: -18, bottom: 8 }}>
                <defs>
                  <linearGradient id="dashboardGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c6ff00" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#c6ff00" stopOpacity={0.03} />
                  </linearGradient>
                  <filter id="lineGlow">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid stroke="#141b25" vertical={false} />
                <XAxis axisLine={false} tickLine={false} dataKey="day" stroke="#556277" dy={16} />
                <YAxis hide domain={[20, 90]} />
                <Tooltip
                  cursor={{ stroke: '#2d3748', strokeDasharray: '4 4' }}
                  contentStyle={{ background: '#101722', border: '1px solid #1e2632', borderRadius: '16px' }}
                  formatter={(value) => [`${value}`, 'Hydration Score']}
                  labelStyle={{ color: '#dce5f0' }}
                />
                <Area
                  type="monotone"
                  dataKey="hydration"
                  stroke="#c6ff00"
                  fill="url(#dashboardGlow)"
                  strokeWidth={3}
                  filter="url(#lineGlow)"
                  activeDot={{ r: 6, fill: '#c6ff00', stroke: '#11161f', strokeWidth: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="rounded-[28px] p-6">
            <div className="mb-5 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#d7dfec]">
              <Lightbulb className="h-4 w-4 text-neon" />
              AI Insights
            </div>
            <div className="space-y-3">
              {activeInsights.map((item, index) => (
                <div
                  key={item.title}
                  className={`rounded-[22px] border p-4 ${
                    item.tone === 'green'
                      ? 'border-neon/15 bg-[linear-gradient(180deg,rgba(63,79,23,0.7),rgba(38,47,21,0.9))]'
                      : 'border-border bg-[#121926]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 grid h-7 w-7 place-items-center rounded-full ${index === 0 ? 'bg-neon/10 text-neon' : 'bg-[#1d2635] text-[#7f8ca4]'}`}>
                      {index === 0 ? <TrendingUp className="h-3.5 w-3.5" /> : index === 1 ? <Clock3 className="h-3.5 w-3.5" /> : <TriangleAlert className="h-3.5 w-3.5" />}
                    </div>
                    <p className="text-sm leading-6 text-[#c8d1dd]">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-full border border-border bg-transparent px-4 py-3 text-sm font-semibold text-text-muted transition hover:text-white"
            >
              View Full Report
            </button>
          </Card>

          <Card className="rounded-[28px] bg-[linear-gradient(180deg,#202a13,#11161f_58%)]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Subscription Plan</h3>
              <span className="text-sm font-semibold text-neon">Active</span>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <Badge label="ENTERPRISE" tone="blue" />
              <span className="text-sm text-text-muted">1.2 TB / 2 TB</span>
            </div>
            <p className="mt-5 text-sm text-text-muted">Storage Used</p>
            <div className="mt-3 h-2 rounded-full bg-[#263145]">
              <div className="h-full w-[68%] rounded-full bg-neon shadow-[0_0_16px_rgba(198,255,0,0.35)]" />
            </div>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-text-dim">Trend View</span>
              <span className="text-white">{trendView}</span>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

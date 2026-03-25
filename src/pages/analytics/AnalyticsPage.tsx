import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '../../components/ui/Card'
import { hydrationTrend } from '../../mock/data'

const pieData = [
  { name: 'Optimal', value: 64, color: '#c6ff00' },
  { name: 'Moderate', value: 22, color: '#3b82f6' },
  { name: 'Low', value: 14, color: '#ef4444' },
]

const products = [
  { name: 'Hydra Boost Pro', units: 2450, value: '$61,250', trend: '+15%' },
  { name: 'AForce Smart Bottle', units: 1210, value: '$96,800', trend: '+5%' },
  { name: 'Nano-Electrolytes', units: 890, value: '$26,200', trend: '-2%' },
]

export function AnalyticsPage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card><p className="text-sm text-text-dim">Total Sales</p><p className="mt-2 text-4xl font-bold text-white">$184,250</p><p className="text-neon">+12.4%</p></Card>
        <Card><p className="text-sm text-text-dim">Total Orders</p><p className="mt-2 text-4xl font-bold text-white">4,320</p><p className="text-neon">+8%</p></Card>
        <Card><p className="text-sm text-text-dim">Active Users</p><p className="mt-2 text-4xl font-bold text-white">12,450</p><p className="text-text-muted">Logged hydration in last 24h</p></Card>
        <Card><p className="text-sm text-text-dim">Avg Hydration Score</p><p className="mt-2 text-4xl font-bold text-white">78%</p><p className="text-neon">+2%</p></Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card title="Sales Performance">
          <div className="h-64">
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
        <Card title="Hydration Score Distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={70} outerRadius={90} paddingAngle={4}>
                  {pieData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-2 text-sm">
            {pieData.map((entry) => <p key={entry.name} className="flex justify-between text-text-muted"><span>{entry.name}</span><span style={{ color: entry.color }}>{entry.value}%</span></p>)}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card title="Hydration Engagement">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hydrationTrend}>
                <CartesianGrid stroke="#1f2632" vertical={false} />
                <XAxis dataKey="day" stroke="#6a7a91" />
                <YAxis stroke="#6a7a91" />
                <Tooltip />
                <Bar dataKey="intake" stackId="a" fill="#c6ff00" />
                <Bar dataKey="checkins" stackId="a" fill="#475569" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Top Selling Products">
          <div className="space-y-4">
            {products.map((item) => (
              <div key={item.name} className="rounded-xl border border-border bg-panel p-3">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-xs text-text-muted">{item.units} units sold</p>
                <div className="mt-2 flex justify-between text-sm"><span className="text-white">{item.value}</span><span className={item.trend.startsWith('+') ? 'text-neon' : 'text-red-300'}>{item.trend}</span></div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}

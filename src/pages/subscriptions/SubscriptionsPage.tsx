import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { Table } from '../../components/ui/Table'

type PlanName = 'Starter' | 'Growth' | 'Enterprise'
type SubscriptionStatus = 'Active' | 'Trial' | 'Past Due' | 'Cancelled'

interface Plan {
  name: PlanName
  price: number
  billed: string
  accounts: number
  status: 'Active' | 'Custom'
  retention: string
  usage: number
}

interface Subscriber {
  id: string
  name: string
  email: string
  plan: PlanName
  status: SubscriptionStatus
  amount: number
  renewsOn: string
}

const monthlyOverview = [
  { month: 'Jan', revenue: 62200, subscribers: 1810 },
  { month: 'Feb', revenue: 67100, subscribers: 1924 },
  { month: 'Mar', revenue: 70480, subscribers: 2018 },
  { month: 'Apr', revenue: 73920, subscribers: 2094 },
  { month: 'May', revenue: 78160, subscribers: 2142 },
  { month: 'Jun', revenue: 84240, subscribers: 2184 },
]

const initialPlans: Plan[] = [
  { name: 'Starter', price: 29, billed: 'Monthly', accounts: 420, status: 'Active', retention: '91%', usage: 46 },
  { name: 'Growth', price: 79, billed: 'Monthly', accounts: 1140, status: 'Active', retention: '95%', usage: 72 },
  { name: 'Enterprise', price: 199, billed: 'Custom Contract', accounts: 624, status: 'Custom', retention: '98%', usage: 64 },
]

const subscribersData: Subscriber[] = [
  { id: 'SUB-1001', name: 'Maya Chen', email: 'maya@northpeak.io', plan: 'Growth', status: 'Active', amount: 79, renewsOn: 'Apr 08, 2026' },
  { id: 'SUB-1002', name: 'Jordan Reeves', email: 'jordan@rivehealth.com', plan: 'Enterprise', status: 'Active', amount: 199, renewsOn: 'Apr 12, 2026' },
  { id: 'SUB-1003', name: 'Ava Thompson', email: 'ava@kineticlabs.co', plan: 'Starter', status: 'Trial', amount: 29, renewsOn: 'Apr 03, 2026' },
  { id: 'SUB-1004', name: 'Noah Patel', email: 'noah@vertisuite.com', plan: 'Growth', status: 'Past Due', amount: 79, renewsOn: 'Mar 27, 2026' },
  { id: 'SUB-1005', name: 'Sophia Kim', email: 'sophia@orionworks.ai', plan: 'Enterprise', status: 'Active', amount: 199, renewsOn: 'Apr 18, 2026' },
  { id: 'SUB-1006', name: 'Ethan Brooks', email: 'ethan@acclive.com', plan: 'Starter', status: 'Cancelled', amount: 29, renewsOn: 'Ended' },
]

const statusToneMap: Record<SubscriptionStatus, 'green' | 'blue' | 'gray' | 'red' | 'yellow'> = {
  Active: 'green',
  Trial: 'blue',
  'Past Due': 'red',
  Cancelled: 'gray',
}

export function SubscriptionsPage() {
  const [plans, setPlans] = useState(initialPlans)
  const [search, setSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'All' | SubscriptionStatus>('All')
  const [selectedPlan, setSelectedPlan] = useState<'All' | PlanName>('All')
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [priceDraft, setPriceDraft] = useState('')

  const filteredSubscribers = useMemo(
    () =>
      subscribersData.filter((subscriber) => {
        const matchesSearch = [subscriber.id, subscriber.name, subscriber.email].join(' ').toLowerCase().includes(search.toLowerCase())
        const matchesStatus = selectedStatus === 'All' || subscriber.status === selectedStatus
        const matchesPlan = selectedPlan === 'All' || subscriber.plan === selectedPlan
        return matchesSearch && matchesStatus && matchesPlan
      }),
    [search, selectedStatus, selectedPlan],
  )

  const kpis = useMemo(() => {
    const activeSubscribers = subscribersData.filter((item) => item.status === 'Active').length
    const monthlyRevenue = subscribersData.filter((item) => item.status !== 'Cancelled').reduce((sum, item) => sum + item.amount, 0)
    const pastDueCount = subscribersData.filter((item) => item.status === 'Past Due').length

    return [
      { label: 'Monthly Recurring Revenue', value: `$${monthlyOverview.at(-1)?.revenue.toLocaleString() ?? '0'}`, trend: '+9.4%' },
      { label: 'Subscribed Users', value: activeSubscribers.toString().padStart(2, '0'), trend: '+3 this week' },
      { label: 'Past Due Accounts', value: pastDueCount.toString().padStart(2, '0'), trend: `${Math.round((pastDueCount / subscribersData.length) * 100)}% of base` },
      { label: 'Live Billing Snapshot', value: `$${monthlyRevenue}`, trend: 'Current sample' },
    ]
  }, [])

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 xl:grid-cols-4">
        {kpis.map((item, index) => (
          <Card key={item.label} className={index === 0 ? 'bg-[linear-gradient(135deg,rgba(198,255,0,0.14),rgba(14,18,24,1)_48%)]' : undefined}>
            <p className="text-sm text-text-dim">{item.label}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="text-4xl font-bold text-white">{item.value}</p>
              <Badge label={item.trend} tone={index === 2 ? 'yellow' : 'green'} />
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.95fr]">
        <Card title="Monthly Overview" subtitle="Revenue and subscriber momentum across the last six months">
          <div className="mb-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-panel p-4">
              <p className="text-sm text-text-muted">Best month</p>
              <p className="mt-2 text-2xl font-semibold text-white">June</p>
              <p className="mt-1 text-sm text-neon">$84,240 MRR</p>
            </div>
            <div className="rounded-2xl border border-border bg-panel p-4">
              <p className="text-sm text-text-muted">Net subscriber growth</p>
              <p className="mt-2 text-2xl font-semibold text-white">+374</p>
              <p className="mt-1 text-sm text-text-muted">Jan to Jun trajectory</p>
            </div>
            <div className="rounded-2xl border border-border bg-panel p-4">
              <p className="text-sm text-text-muted">Average revenue per account</p>
              <p className="mt-2 text-2xl font-semibold text-white">$38.5</p>
              <p className="mt-1 text-sm text-text-muted">Blended active portfolio</p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyOverview}>
                <defs>
                  <linearGradient id="subscriptionRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c6ff00" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#c6ff00" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1f2632" vertical={false} />
                <XAxis dataKey="month" stroke="#6a7a91" />
                <YAxis stroke="#6a7a91" tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: '#101722', border: '1px solid #1e2632', borderRadius: '16px' }}
                  formatter={(value, name) => {
                    const numericValue = typeof value === 'number' ? value : Number(value ?? 0)
                    return [name === 'revenue' ? `$${numericValue.toLocaleString()}` : numericValue.toLocaleString(), name === 'revenue' ? 'Revenue' : 'Subscribers']
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#c6ff00" fill="url(#subscriptionRevenue)" strokeWidth={3} />
                <Area type="monotone" dataKey="subscribers" stroke="#8ea2c7" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Plan Management" subtitle="Adjust plan pricing and monitor account concentration">
          <div className="space-y-4">
            {plans.map((plan) => (
              <div key={plan.name} className="rounded-2xl border border-border bg-panel p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{plan.name}</p>
                      <Badge label={plan.status} tone={plan.status === 'Custom' ? 'blue' : 'green'} />
                    </div>
                    <p className="mt-1 text-sm text-text-muted">{plan.accounts.toLocaleString()} subscribed accounts</p>
                  </div>
                  <Button
                    variant="ghost"
                    className="h-9 px-3"
                    onClick={() => {
                      setEditingPlan(plan)
                      setPriceDraft(plan.price.toString())
                    }}
                  >
                    Edit Price
                  </Button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-text-dim">Price</p>
                    <p className="mt-1 text-lg font-semibold text-white">${plan.price}/{plan.billed === 'Monthly' ? 'mo' : 'contract'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-text-dim">Retention</p>
                    <p className="mt-1 text-lg font-semibold text-white">{plan.retention}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-text-dim">Usage</p>
                    <p className="mt-1 text-lg font-semibold text-white">{plan.usage}%</p>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-[#0b1118]">
                  <div className="h-full rounded-full bg-neon" style={{ width: `${plan.usage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <Card title="Subscribed Users" subtitle="View active customers, filter them and review billing status">
          <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
            <Input placeholder="Search by user, email or subscription ID" value={search} onChange={(event) => setSearch(event.target.value)} />
            <Button variant="ghost" className="px-4" onClick={() => setSelectedPlan((prev) => (prev === 'All' ? 'Growth' : prev === 'Growth' ? 'Enterprise' : prev === 'Enterprise' ? 'Starter' : 'All'))}>
              Plan: {selectedPlan}
            </Button>
            <Button variant="ghost" className="px-4" onClick={() => setSelectedStatus((prev) => (prev === 'All' ? 'Active' : prev === 'Active' ? 'Trial' : prev === 'Trial' ? 'Past Due' : prev === 'Past Due' ? 'Cancelled' : 'All'))}>
              Status: {selectedStatus}
            </Button>
          </div>

          <Table columns={['Subscriber', 'Plan', 'Amount', 'Renewal', 'Status', 'Actions']}>
            {filteredSubscribers.map((subscriber) => (
              <tr key={subscriber.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <p className="font-semibold text-white">{subscriber.name}</p>
                  <p className="text-xs text-text-muted">{subscriber.email} • {subscriber.id}</p>
                </td>
                <td className="px-4 py-3 text-text-muted">{subscriber.plan}</td>
                <td className="px-4 py-3 font-semibold text-white">${subscriber.amount}/mo</td>
                <td className="px-4 py-3 text-text-muted">{subscriber.renewsOn}</td>
                <td className="px-4 py-3">
                  <Badge label={subscriber.status} tone={statusToneMap[subscriber.status]} />
                </td>
                <td className="px-4 py-3">
                  <Button variant="ghost" className="h-9 px-3">
                    Manage
                  </Button>
                </td>
              </tr>
            ))}
          </Table>
          <div className="mt-4 flex items-center justify-between text-sm text-text-dim">
            <p>Showing {filteredSubscribers.length} subscribed users</p>
            <p>{filteredSubscribers.filter((item) => item.status === 'Active').length} active in current filter</p>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card title="Billing Focus" subtitle="High-signal areas that need admin attention">
            <div className="space-y-4">
              <div className="rounded-2xl border border-neon/20 bg-neon/10 p-4">
                <p className="text-sm text-text-muted">Renewals due this week</p>
                <p className="mt-2 text-3xl font-bold text-white">148</p>
                <p className="mt-2 text-sm text-neon">Strong renewal pipeline</p>
              </div>
              <div className="rounded-2xl border border-border bg-panel p-4">
                <p className="text-sm text-text-muted">Past due revenue exposure</p>
                <p className="mt-2 text-3xl font-bold text-white">$632</p>
                <p className="mt-2 text-sm text-red-300">Collect within 48 hours</p>
              </div>
              <div className="rounded-2xl border border-border bg-panel p-4">
                <p className="text-sm text-text-muted">Trial conversions this month</p>
                <p className="mt-2 text-3xl font-bold text-white">62%</p>
                <p className="mt-2 text-sm text-text-muted">Up from 54% last month</p>
              </div>
            </div>
          </Card>

          <Card title="Admin Actions">
            <div className="space-y-3">
              <div className="rounded-2xl border border-border bg-panel p-4">
                <p className="font-semibold text-white">Revisit Starter pricing</p>
                <p className="mt-2 text-sm text-text-muted">Starter adoption is healthy, but retention trails Growth by 4 points.</p>
              </div>
              <div className="rounded-2xl border border-border bg-panel p-4">
                <p className="font-semibold text-white">Prioritize failed payments</p>
                <p className="mt-2 text-sm text-text-muted">One Growth account is already past due and should be contacted.</p>
              </div>
              <Button className="w-full">Download Billing Report</Button>
            </div>
          </Card>
        </div>
      </section>

      <Modal isOpen={Boolean(editingPlan)} onClose={() => setEditingPlan(null)} title={editingPlan ? `Update ${editingPlan.name} Pricing` : 'Update Pricing'}>
        {editingPlan ? (
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault()
              const nextPrice = Number(priceDraft)
              if (!Number.isFinite(nextPrice) || nextPrice <= 0) return

              setPlans((current) => current.map((plan) => (plan.name === editingPlan.name ? { ...plan, price: nextPrice } : plan)))
              setEditingPlan(null)
            }}
          >
            <div className="rounded-2xl border border-border bg-panel p-4">
              <p className="font-semibold text-white">{editingPlan.name}</p>
              <p className="mt-1 text-sm text-text-muted">Current billing model: {editingPlan.billed}</p>
            </div>

            <Input
              label="Monthly Price"
              type="number"
              min="1"
              step="1"
              value={priceDraft}
              onChange={(event) => setPriceDraft(event.target.value)}
              required
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-panel p-4">
                <p className="text-xs uppercase tracking-wide text-text-dim">Accounts</p>
                <p className="mt-2 text-2xl font-semibold text-white">{editingPlan.accounts.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-border bg-panel p-4">
                <p className="text-xs uppercase tracking-wide text-text-dim">Estimated MRR</p>
                <p className="mt-2 text-2xl font-semibold text-white">${(editingPlan.accounts * Number(priceDraft || editingPlan.price)).toLocaleString()}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="ghost" type="button" onClick={() => setEditingPlan(null)}>
                Cancel
              </Button>
              <Button type="submit">Save Price</Button>
            </div>
          </form>
        ) : null}
      </Modal>
    </div>
  )
}

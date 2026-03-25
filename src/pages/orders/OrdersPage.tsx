import { useMemo, useState } from 'react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { Table } from '../../components/ui/Table'
import { orders as initialOrders } from '../../mock/data'
import type { Order } from '../../types'

const toneMap: Record<Order['status'], 'green' | 'blue' | 'gray' | 'red' | 'yellow'> = {
  Processing: 'yellow',
  Shipped: 'blue',
  Pending: 'gray',
  Delivered: 'green',
  Cancelled: 'red',
}

export function OrdersPage() {
  const [orders] = useState(initialOrders)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Order | null>(null)

  const filtered = useMemo(
    () => orders.filter((order) => [order.id, order.customerName, order.customerEmail].join(' ').toLowerCase().includes(search.toLowerCase())),
    [orders, search],
  )

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
        <Input placeholder="Search orders by ID, customer, or SKU..." value={search} onChange={(event) => setSearch(event.target.value)} />
        <Button variant="ghost">Status: All</Button>
        <Button variant="ghost">Date Range</Button>
        <Button>Export Orders</Button>
      </div>

      <Table columns={['Order ID', 'Customer', 'Amount', 'Status', 'Date', 'Actions']}>
        {filtered.map((order) => (
          <tr key={order.id} className="border-t border-border">
            <td className="px-4 py-3 text-text-muted">{order.id}</td>
            <td className="px-4 py-3"><p className="font-semibold text-white">{order.customerName}</p><p className="text-xs text-text-muted">{order.customerEmail}</p></td>
            <td className="px-4 py-3 font-semibold text-white">${order.amount.toFixed(2)}</td>
            <td className="px-4 py-3"><Badge label={order.status.toUpperCase()} tone={toneMap[order.status]} /></td>
            <td className="px-4 py-3 text-text-muted">{order.date}</td>
            <td className="px-4 py-3"><Button className="h-9" variant="ghost" onClick={() => setSelected(order)}>Details</Button></td>
          </tr>
        ))}
      </Table>
      <p className="text-sm text-text-dim">Showing 1 to 10 of 248 orders</p>

      <Modal isOpen={Boolean(selected)} onClose={() => setSelected(null)} title={selected ? `Order ${selected.id}` : 'Order'}>
        {selected ? (
          <div className="space-y-5">
            <div className="rounded-xl border border-border bg-panel p-4">
              <p className="text-xs uppercase tracking-wide text-text-dim">Customer Information</p>
              <p className="mt-2 text-lg font-semibold text-white">Alex Rivera</p>
              <p className="text-sm text-text-muted">alex.rivera@email.com</p>
              <p className="mt-2 text-sm text-neon">Customer since 2021 • 14 Orders Total</p>
            </div>
            <div className="rounded-xl border border-border bg-panel p-4">
              <p className="text-xs uppercase tracking-wide text-text-dim">Items Purchased</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between text-text-muted"><span>AForce Performance Tee</span><span>$45.00</span></div>
                <div className="flex justify-between text-text-muted"><span>Pro Grip Gloves</span><span>$25.00</span></div>
                <div className="mt-3 border-t border-border pt-3 text-right text-2xl font-bold text-neon">Total $75.00</div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-panel p-4">
                <p className="text-xs uppercase tracking-wide text-text-dim">Payment Method</p>
                <p className="mt-2 text-white">Visa ending in 4242</p>
              </div>
              <div className="rounded-xl border border-border bg-panel p-4">
                <p className="text-xs uppercase tracking-wide text-text-dim">Shipping Address</p>
                <p className="mt-2 text-white">1234 Athlete Way, Suite 100, Los Angeles, CA 90012</p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setSelected(null)}>Close</Button>
              <Button>Update Status</Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { CreditCard, Mail, MapPin, Package } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { Table } from '../../components/ui/Table'
import { useOrdersStore } from '../../store/ordersStore'
import type { Order } from '../../types'

const toneMap: Record<Order['status'], 'green' | 'blue' | 'gray' | 'red' | 'yellow'> = {
  Processing: 'yellow',
  Shipped: 'blue',
  Pending: 'gray',
  Delivered: 'green',
  Cancelled: 'red',
}

const statusAccentMap: Record<Order['status'], string> = {
  Processing: 'bg-[#3f4c00] text-[#d7ff67]',
  Shipped: 'bg-[#0f3150] text-[#8cc6ff]',
  Pending: 'bg-[#363636] text-[#d0d0d0]',
  Delivered: 'bg-[#193a12] text-[#abff8f]',
  Cancelled: 'bg-[#47171b] text-[#ff9da3]',
}

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`
}

function OrderDetailsModal({
  order,
  statusDraft,
  onStatusDraftChange,
  onClose,
  onSave,
}: {
  order: Order | null
  statusDraft: Order['status']
  onStatusDraftChange: (status: Order['status']) => void
  onClose: () => void
  onSave: () => void
}) {
  if (!order) return null

  const items = order.items ?? []
  const shipping = order.shippingAmount ?? 0
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0)
  const total = subtotal + shipping

  return (
    <Modal
      isOpen={Boolean(order)}
      onClose={onClose}
      title=""
      className="max-w-[728px] rounded-[22px] border-[#2b2f1a] bg-[#1e1e1d] shadow-[0_26px_70px_rgba(0,0,0,0.52)]"
    >
      <div className="-mx-6 -mt-5 border-b border-[#252c3b] px-6 pb-5 pt-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-[22px] font-semibold text-white">Order {order.id}</h3>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${statusAccentMap[order.status]}`}>
                {order.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-[#8f99ab]">{order.placedAt ?? order.date}</p>
          </div>
        </div>
      </div>

      <div className="-mx-6 -mb-5">
        <div className="space-y-6 px-5 py-5">
          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f99ab]">Customer Information</p>
            <div className="flex items-center justify-between rounded-[16px] bg-[#313132] px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,#fff0c9,#b6c7d9)] text-lg font-bold text-black">
                  {order.customerName.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <p className="text-[28px] leading-none font-semibold text-white">{order.customerName}</p>
                  <p className="mt-1 text-sm text-[#8f99ab]">{order.customerEmail}</p>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold text-[#b7f500]">Customer since {order.customerSince}</span>
                    <span className="px-2 text-[#5f6672]">•</span>
                    <span className="text-[#8f99ab]">{order.ordersTotal} Orders Total</span>
                  </p>
                </div>
              </div>
              <button type="button" className="text-[#8f99ab] transition hover:text-white" aria-label="Email customer">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f99ab]">Items Purchased</p>
            <div className="overflow-hidden rounded-[16px] border border-[#21304a]">
              <div className="grid grid-cols-[1.6fr_0.4fr_0.5fr_0.5fr] bg-[#313132] px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-[#7f8ea7]">
                <span>Product</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Price</span>
                <span className="text-right">Total</span>
              </div>
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[1.6fr_0.4fr_0.5fr_0.5fr] items-center border-t border-[#21304a] bg-[#1f1f1f] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#2f4734] text-base">{item.image ?? '📦'}</div>
                    <span className="font-medium text-white">{item.name}</span>
                  </div>
                  <span className="text-center text-[#c7cfdd]">{item.qty}</span>
                  <span className="text-right text-[#c7cfdd]">{formatMoney(item.price)}</span>
                  <span className="text-right font-semibold text-white">{formatMoney(item.qty * item.price)}</span>
                </div>
              ))}
            </div>
            <div className="ml-auto w-full max-w-[200px] space-y-1 text-sm">
              <div className="flex justify-between text-[#7f8ea7]"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
              <div className="flex justify-between text-[#7f8ea7]"><span>Shipping</span><span>{formatMoney(shipping)}</span></div>
              <div className="flex justify-between pt-2 text-[14px] font-semibold text-white">
                <span>Total</span>
                <span className="text-[30px] leading-none text-[#c6ff00]">{formatMoney(total)}</span>
              </div>
            </div>
          </section>

          <div className="grid gap-5 md:grid-cols-2">
            <section className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f99ab]">Payment Method</p>
              <div className="rounded-[16px] bg-[#313132] px-4 py-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="mt-0.5 h-5 w-5 text-[#b7f500]" />
                  <div>
                    <p className="font-medium text-white">{order.paymentMethod}</p>
                    <p className="text-sm text-[#7f8ea7]">{order.paymentAuthorizedAt}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f99ab]">Shipping Address</p>
              <div className="rounded-[16px] bg-[#313132] px-4 py-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#b7f500]" />
                  <div className="space-y-1">
                    {order.shippingAddress?.map((line) => <p key={line} className="text-sm text-white">{line}</p>)}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="border-t border-[#252c3b] bg-[#242424] px-5 py-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6f7b8f]">Update Order Status</div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-[240px]">
              <Package className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7f8ea7]" />
              <select
                value={statusDraft}
                onChange={(event) => onStatusDraftChange(event.target.value as Order['status'])}
                className="h-11 w-full appearance-none rounded-[14px] border border-[#31394a] bg-[#1f1f1f] pl-10 pr-4 text-sm text-white outline-none transition focus:border-neon focus:ring-2 focus:ring-neon/15"
              >
                <option>Processing</option>
                <option>Shipped</option>
                <option>Pending</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose} className="h-11 rounded-[14px] border-[#31394a] bg-transparent px-6 text-white">
                Close
              </Button>
              <Button onClick={onSave} className="h-11 rounded-[14px] px-6">
                Update Status
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export function OrdersPage() {
  const orders = useOrdersStore((state) => state.orders)
  const updateOrderStatus = useOrdersStore((state) => state.updateOrderStatus)
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [statusDraft, setStatusDraft] = useState<Order['status']>('Processing')

  const filtered = useMemo(
    () => orders.filter((order) => [order.id, order.customerName, order.customerEmail].join(' ').toLowerCase().includes(search.toLowerCase())),
    [orders, search],
  )
  const selected = useMemo(() => orders.find((order) => order.id === selectedId) ?? null, [orders, selectedId])

  useEffect(() => {
    if (selected) {
      setStatusDraft(selected.status)
    }
  }, [selected])

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
            <td className="px-4 py-3 font-semibold text-white">{formatMoney(order.amount)}</td>
            <td className="px-4 py-3"><Badge label={order.status.toUpperCase()} tone={toneMap[order.status]} /></td>
            <td className="px-4 py-3 text-text-muted">{order.date}</td>
            <td className="px-4 py-3"><Button className="h-9" variant="ghost" onClick={() => setSelectedId(order.id)}>Details</Button></td>
          </tr>
        ))}
      </Table>
      <p className="text-sm text-text-dim">Showing 1 to {filtered.length} of 248 orders</p>

      <OrderDetailsModal
        order={selected}
        statusDraft={statusDraft}
        onStatusDraftChange={setStatusDraft}
        onClose={() => setSelectedId(null)}
        onSave={() => {
          if (!selected) return
          updateOrderStatus(selected.id, statusDraft)
          setSelectedId(null)
        }}
      />
    </div>
  )
}

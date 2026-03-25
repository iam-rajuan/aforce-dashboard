import { FormEvent, useMemo, useState } from 'react'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { Table } from '../../components/ui/Table'
import { Toggle } from '../../components/ui/Toggle'
import { products as initialProducts } from '../../mock/data'
import type { Product } from '../../types'

const emptyProduct: Product = {
  id: '',
  name: '',
  sku: '',
  category: 'Electrolyte Mix',
  price: 0,
  stock: 0,
  status: 'Active',
}

export function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [isAddOpen, setAddOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)
  const [target, setTarget] = useState<Product | null>(null)
  const [draft, setDraft] = useState<Product>(emptyProduct)

  const filtered = useMemo(
    () => products.filter((product) => [product.name, product.sku, product.category].join(' ').toLowerCase().includes(search.toLowerCase())),
    [products, search],
  )

  const onAdd = (event: FormEvent) => {
    event.preventDefault()
    const next = { ...draft, id: `P-${Date.now()}`, sku: draft.sku || `AF-${Math.floor(Math.random() * 99999)}` }
    setProducts((prev) => [next, ...prev])
    setDraft(emptyProduct)
    setAddOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <Input placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)} />
        <Button variant="ghost">All Categories</Button>
        <Button onClick={() => setAddOpen(true)}>+ Add Product</Button>
      </div>

      <Table columns={['Image', 'Product Name & SKU', 'Category', 'Price', 'Stock', 'Status', 'Actions']}>
        {filtered.map((product) => (
          <tr key={product.id} className="border-t border-border">
            <td className="px-4 py-3"><div className="grid h-10 w-10 place-items-center rounded-lg bg-panel">📦</div></td>
            <td className="px-4 py-3"><p className="font-semibold text-white">{product.name}</p><p className="text-xs text-text-muted">SKU: {product.sku}</p></td>
            <td className="px-4 py-3"><Badge label={product.category} tone="green" /></td>
            <td className="px-4 py-3 text-white">${product.price.toFixed(2)}</td>
            <td className="px-4 py-3 text-white">{product.stock}</td>
            <td className="px-4 py-3"><Badge label={product.status.toUpperCase()} tone={product.status === 'Active' ? 'green' : 'gray'} /></td>
            <td className="px-4 py-3"><Button variant="danger" className="h-9" onClick={() => { setTarget(product); setDeleteOpen(true) }}>Delete</Button></td>
          </tr>
        ))}
      </Table>
      <p className="text-sm text-text-dim">Showing 1-10 of 1,240 products</p>

      <Modal isOpen={isAddOpen} onClose={() => setAddOpen(false)} title="Add New Product">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onAdd}>
          <div className="space-y-4 md:col-span-1">
            <Input label="Product Name" placeholder="e.g. Ultra Hydrate Pro" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} required />
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-text-muted">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Category</span>
                <select className="h-11 rounded-xl border border-border bg-panel px-3 text-white" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })}>
                  <option>Electrolyte Mix</option>
                  <option>Accessories</option>
                  <option>Recovery</option>
                </select>
              </label>
              <Input label="Price" type="number" min={0} value={draft.price} onChange={(event) => setDraft({ ...draft, price: Number(event.target.value) })} />
            </div>
            <Input label="Stock Quantity" type="number" min={0} value={draft.stock} onChange={(event) => setDraft({ ...draft, stock: Number(event.target.value) })} />
            <label className="grid gap-2 text-sm text-text-muted">
              <span className="text-xs font-semibold uppercase tracking-wide text-text-dim">Description</span>
              <textarea className="min-h-28 rounded-xl border border-border bg-panel p-3 text-white outline-none focus:border-neon" placeholder="Describe product benefits and ingredients..." />
            </label>
          </div>
          <div className="space-y-4 rounded-2xl border border-border bg-panel p-4 md:col-span-1">
            <div className="rounded-2xl border border-dashed border-border p-6 text-center text-text-muted">
              Drag & drop product image
              <p className="text-xs">JPG, PNG or WEBP (max 5MB)</p>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3">
              <div>
                <p className="text-sm text-white">Product Status</p>
                <p className="text-xs text-text-dim">Set if product is visible</p>
              </div>
              <Toggle checked={draft.status === 'Active'} onChange={(next) => setDraft({ ...draft, status: next ? 'Active' : 'Inactive' })} />
            </div>
            <div className="rounded-xl bg-black/40 p-6 text-center text-text-dim">Preview Mode</div>
          </div>
          <div className="md:col-span-2 flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button type="submit">Save Product</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Product?" className="max-w-md">
        <p className="text-text-muted">This action cannot be undone. All data associated with this product will be permanently removed.</p>
        {target ? <div className="mt-4 rounded-xl border border-border bg-panel p-3 text-sm text-text-muted">{target.name}<br />SKU: {target.sku}</div> : null}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => { if (target) setProducts((prev) => prev.filter((item) => item.id !== target.id)); setDeleteOpen(false) }}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}

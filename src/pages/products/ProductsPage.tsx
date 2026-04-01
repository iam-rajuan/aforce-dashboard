import { FormEvent, useMemo, useRef, useState } from 'react'
import { ChevronDown, ImagePlus, Upload, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { Table } from '../../components/ui/Table'
import { Toggle } from '../../components/ui/Toggle'
import { useProductsStore } from '../../store/productsStore'
import type { Product } from '../../types'

const categoryOptions = ['Electrolyte Mix', 'Hydration Tablets', 'Recovery', 'Accessories']

type ProductDraft = {
  name: string
  category: string
  price: string
  stock: string
  status: Product['status']
  description: string
  image?: string
  benefits: string[]
}

const emptyProduct: ProductDraft = {
  name: '',
  category: 'Electrolyte Mix',
  price: '',
  stock: '',
  status: 'Active',
  description: '',
  image: '',
  benefits: ['Electrolytes', 'Hydration Boost', 'Magnesium', 'Vitamin B12'],
}

function ProductPreview({ draft }: { draft: ProductDraft }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#2f2f2f] bg-[linear-gradient(180deg,#2b2b2b_0%,#181818_100%)]">
      <div className="flex h-[180px] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_60%)]">
        {draft.image ? (
          <img src={draft.image} alt={draft.name || 'Product preview'} className="h-full w-full object-cover opacity-90" />
        ) : (
          <div className="grid h-14 w-14 place-items-center rounded-xl border border-[#3d3d3d] bg-black/15 text-[#4f4f4f]">
            <ImagePlus className="h-7 w-7" />
          </div>
        )}
      </div>
      <div className="space-y-3 bg-[#111111] px-4 py-3">
        <span className="inline-flex rounded-full bg-[#b7f5001a] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#b7f500]">
          Preview Mode
        </span>
        <div className="h-3 w-28 rounded-full bg-[#2b2b2b]" />
        <div className="h-2.5 w-16 rounded-full bg-[#222222]" />
      </div>
    </div>
  )
}

function AddProductModal({
  isOpen,
  draft,
  benefitInput,
  onClose,
  onDraftChange,
  onBenefitInputChange,
  onBenefitAdd,
  onBenefitRemove,
  onImageChange,
  onSubmit,
}: {
  isOpen: boolean
  draft: ProductDraft
  benefitInput: string
  onClose: () => void
  onDraftChange: (next: ProductDraft) => void
  onBenefitInputChange: (value: string) => void
  onBenefitAdd: () => void
  onBenefitRemove: (benefit: string) => void
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const canSave = Boolean(draft.name.trim() && draft.price !== '' && draft.stock !== '')

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Product"
      className="max-w-[704px] rounded-[22px] border-[#30311d] bg-[#1d1d1c] shadow-[0_24px_70px_rgba(0,0,0,0.52)]"
    >
      <div className="-mx-6 -mt-3 border-b border-[#2f2f2f] px-6 pb-4">
        <p className="text-sm text-[#8e8e8e]">Create a new beverage product for the marketplace.</p>
      </div>

      <form className="-mx-6 -mb-5" onSubmit={onSubmit}>
        <div className="grid gap-6 px-5 py-5 md:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-4">
            <Input
              label="Product Name"
              placeholder="e.g. Ultra Hydrate Pro"
              value={draft.name}
              onChange={(event) => onDraftChange({ ...draft, name: event.target.value })}
              className="h-[42px] rounded-[12px] border-[#2d2d2d] bg-[#151515] text-[#d6d6d6] placeholder:text-[#666] focus:border-neon focus:ring-neon/15"
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[#90959c]">
                <span className="text-xs font-semibold text-[#d0d0d0]">Category</span>
                <div className="relative">
                  <select
                    value={draft.category}
                    onChange={(event) => onDraftChange({ ...draft, category: event.target.value })}
                    className="h-[42px] w-full appearance-none rounded-[12px] border border-[#2d2d2d] bg-[#151515] px-4 pr-10 text-[15px] text-[#d6d6d6] outline-none transition focus:border-neon focus:ring-2 focus:ring-neon/15"
                  >
                    {categoryOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b5ff00]" />
                </div>
              </label>

              <label className="grid gap-2 text-sm text-[#90959c]">
                <span className="text-xs font-semibold text-[#d0d0d0]">Price</span>
                <div className="flex h-[42px] rounded-[12px] border border-[#2d2d2d] bg-[#151515] px-4 text-[#d6d6d6] focus-within:border-neon focus-within:ring-2 focus-within:ring-neon/15">
                  <span className="flex items-center text-[#7d7d7d]">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={draft.price}
                    onChange={(event) => onDraftChange({ ...draft, price: event.target.value })}
                    className="w-full bg-transparent pl-2 text-[15px] outline-none"
                    placeholder="0.00"
                  />
                </div>
              </label>
            </div>

            <Input
              label="Stock Quantity"
              type="number"
              min={0}
              placeholder="Enter quantity"
              value={draft.stock}
              onChange={(event) => onDraftChange({ ...draft, stock: event.target.value })}
              className="h-[42px] rounded-[12px] border-[#2d2d2d] bg-[#151515] text-[#d6d6d6] placeholder:text-[#666] focus:border-neon focus:ring-neon/15"
            />

            <label className="grid gap-2 text-sm text-[#90959c]">
              <span className="text-xs font-semibold text-[#d0d0d0]">Description</span>
              <div className="rounded-[14px] border border-[#2d2d2d] bg-[#151515] p-3 focus-within:border-neon">
                <textarea
                  maxLength={500}
                  value={draft.description}
                  onChange={(event) => onDraftChange({ ...draft, description: event.target.value })}
                  placeholder="Describe the product benefits and ingredients..."
                  className="min-h-[76px] w-full resize-none bg-transparent text-[15px] text-[#d6d6d6] outline-none placeholder:text-[#666]"
                />
                <div className="text-right text-[11px] text-[#6d6d6d]">{draft.description.length} / 500</div>
              </div>
            </label>

            <div className="grid gap-2 text-sm text-[#90959c]">
              <span className="text-xs font-semibold text-[#d0d0d0]">Key Benefits</span>
              <div className="rounded-[14px] border border-[#2d2d2d] bg-[#151515] p-3">
                <div className="mb-2 flex flex-wrap gap-2">
                  {draft.benefits.map((benefit) => (
                    <button
                      key={benefit}
                      type="button"
                      onClick={() => onBenefitRemove(benefit)}
                      className="inline-flex items-center gap-1 rounded-full bg-[#c6ff00] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-black"
                    >
                      {benefit}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                  <input
                    value={benefitInput}
                    onChange={(event) => onBenefitInputChange(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ',') {
                        event.preventDefault()
                        onBenefitAdd()
                      }
                    }}
                    className="min-w-24 flex-1 bg-transparent text-sm text-[#d6d6d6] outline-none placeholder:text-[#666]"
                    placeholder="Add benefit..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid gap-2 text-sm text-[#90959c]">
              <span className="text-xs font-semibold text-[#d0d0d0]">Product Image</span>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="grid min-h-[150px] place-items-center rounded-[22px] border border-dashed border-[#373737] bg-[#191919] p-5 text-center transition hover:border-[#4a4a4a]"
              >
                {draft.image ? (
                  <img src={draft.image} alt="Selected product" className="h-[150px] w-full rounded-[16px] object-cover" />
                ) : (
                  <div className="space-y-3">
                    <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#2a2a2a] text-[#8d8d8d]">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#d6d6d6]">Drag & drop product image</p>
                      <p className="text-xs text-[#6f6f6f]">JPG, PNG or WEBP (Max 5MB)</p>
                    </div>
                  </div>
                )}
              </button>
              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={onImageChange} />
            </div>

            <div className="flex items-center justify-between rounded-[18px] border border-[#2f2f2f] bg-[#202020] px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-white">Product Status</p>
                <p className="text-xs text-[#8a8a8a]">Set if product is visible</p>
              </div>
              <Toggle checked={draft.status === 'Active'} onChange={(next) => onDraftChange({ ...draft, status: next ? 'Active' : 'Inactive' })} />
            </div>

            <ProductPreview draft={draft} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 border-t border-[#2f2f2f] bg-[#1f1f1f] px-5 py-4">
          <button type="button" onClick={onClose} className="px-4 text-sm font-semibold text-[#b7f500] transition hover:text-[#d7ff67]">
            Cancel
          </button>
          <Button
            type="submit"
            disabled={!canSave}
            className="h-11 min-w-36 rounded-[14px] bg-[#c6ff00] px-6 text-sm font-semibold text-black shadow-[0_0_22px_rgba(198,255,0,0.32)] hover:brightness-105"
          >
            Save Product
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export function ProductsPage() {
  const products = useProductsStore((state) => state.products)
  const createProduct = useProductsStore((state) => state.createProduct)
  const deleteProduct = useProductsStore((state) => state.deleteProduct)
  const [search, setSearch] = useState('')
  const [isDeleteOpen, setDeleteOpen] = useState(false)
  const [target, setTarget] = useState<Product | null>(null)
  const [draft, setDraft] = useState<ProductDraft>(emptyProduct)
  const [benefitInput, setBenefitInput] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const filtered = useMemo(
    () => products.filter((product) => [product.name, product.sku, product.category].join(' ').toLowerCase().includes(search.toLowerCase())),
    [products, search],
  )
  const isAddOpen = searchParams.get('modal') === 'add'

  const closeAddModal = () => {
    setDraft(emptyProduct)
    setBenefitInput('')
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      next.delete('modal')
      return next
    })
  }

  const onAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createProduct({
      name: draft.name,
      category: draft.category,
      price: Number(draft.price || 0),
      stock: Number(draft.stock || 0),
      status: draft.status,
      image: draft.image,
      description: draft.description,
      benefits: draft.benefits,
    })
    closeAddModal()
  }

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setDraft((current) => ({ ...current, image: typeof reader.result === 'string' ? reader.result : '' }))
    }
    reader.readAsDataURL(file)
  }

  const addBenefit = () => {
    const normalized = benefitInput.trim()
    if (!normalized) return

    setDraft((current) => ({
      ...current,
      benefits: current.benefits.includes(normalized) ? current.benefits : [...current.benefits, normalized],
    }))
    setBenefitInput('')
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <Input placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)} />
        <Button variant="ghost">All Categories</Button>
        <Button onClick={() => setSearchParams({ modal: 'add' })}>+ Add Product</Button>
      </div>

      <Table columns={['Image', 'Product Name & SKU', 'Category', 'Price', 'Stock', 'Status', 'Actions']}>
        {filtered.map((product) => (
          <tr key={product.id} className="border-t border-border">
            <td className="px-4 py-3">
              <div className="grid h-10 w-10 overflow-hidden rounded-lg bg-panel">
                {product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : <div className="grid place-items-center">📦</div>}
              </div>
            </td>
            <td className="px-4 py-3"><p className="font-semibold text-white">{product.name}</p><p className="text-xs text-text-muted">SKU: {product.sku}</p></td>
            <td className="px-4 py-3"><Badge label={product.category} tone="green" /></td>
            <td className="px-4 py-3 text-white">${product.price.toFixed(2)}</td>
            <td className="px-4 py-3 text-white">{product.stock}</td>
            <td className="px-4 py-3"><Badge label={product.status.toUpperCase()} tone={product.status === 'Active' ? 'green' : 'gray'} /></td>
            <td className="px-4 py-3"><Button variant="danger" className="h-9" onClick={() => { setTarget(product); setDeleteOpen(true) }}>Delete</Button></td>
          </tr>
        ))}
      </Table>
      <p className="text-sm text-text-dim">Showing 1-{filtered.length} of 1,240 products</p>

      <AddProductModal
        isOpen={isAddOpen}
        draft={draft}
        benefitInput={benefitInput}
        onClose={closeAddModal}
        onDraftChange={setDraft}
        onBenefitInputChange={setBenefitInput}
        onBenefitAdd={addBenefit}
        onBenefitRemove={(benefit) => setDraft((current) => ({ ...current, benefits: current.benefits.filter((item) => item !== benefit) }))}
        onImageChange={onImageChange}
        onSubmit={onAdd}
      />

      <Modal isOpen={isDeleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Product?" className="max-w-md">
        <p className="text-text-muted">This action cannot be undone. All data associated with this product will be permanently removed.</p>
        {target ? <div className="mt-4 rounded-xl border border-border bg-panel p-3 text-sm text-text-muted">{target.name}<br />SKU: {target.sku}</div> : null}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => { if (target) deleteProduct(target.id); setDeleteOpen(false) }}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}

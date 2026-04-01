import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { products as initialProducts } from '../mock/data'
import type { Product } from '../types'

interface CreateProductInput {
  name: string
  category: string
  price: number
  stock: number
  status: Product['status']
  image?: string
  description?: string
  benefits?: string[]
}

interface ProductsState {
  products: Product[]
  createProduct: (input: CreateProductInput) => Product
  deleteProduct: (id: string) => void
}

function nextProductId(products: Product[]) {
  const maxId = products.reduce((highest, product) => {
    const numeric = Number(product.id.replace(/\D/g, ''))
    return Number.isFinite(numeric) ? Math.max(highest, numeric) : highest
  }, 2000)

  return `P-${String(maxId + 1).padStart(4, '0')}`
}

function nextSku(products: Product[]) {
  const next = products.length + 1
  return `AF-${String(next).padStart(5, '0')}`
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      createProduct: (input) => {
        const products = get().products
        const product: Product = {
          id: nextProductId(products),
          sku: nextSku(products),
          name: input.name.trim(),
          category: input.category,
          price: input.price,
          stock: input.stock,
          status: input.status,
          image: input.image,
          description: input.description?.trim() ?? '',
          benefits: input.benefits ?? [],
        }

        set((state) => ({ products: [product, ...state.products] }))
        return product
      },
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),
    }),
    {
      name: 'aforce-products',
    },
  ),
)

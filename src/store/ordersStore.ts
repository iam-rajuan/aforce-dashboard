import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { orders as initialOrders } from '../mock/data'
import type { Order } from '../types'

interface OrdersState {
  orders: Order[]
  updateOrderStatus: (id: string, status: Order['status']) => void
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: initialOrders,
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) => (order.id === id ? { ...order, status } : order)),
        })),
    }),
    {
      name: 'aforce-orders',
    },
  ),
)

import { contentItems, hydrationTrend, orders, products, users } from '../mock/data'
import type { ContentItem, Order, Product, TrendPoint, User } from '../types'
import { withMockDelay } from '../utils/async'

export const api = {
  getUsers: async (): Promise<User[]> => withMockDelay(users),
  updateUser: async (nextUser: User): Promise<User> => withMockDelay(nextUser),
  getProducts: async (): Promise<Product[]> => withMockDelay(products),
  createProduct: async (nextProduct: Product): Promise<Product> => withMockDelay(nextProduct),
  deleteProduct: async (productId: string): Promise<{ productId: string }> => withMockDelay({ productId }),
  getOrders: async (): Promise<Order[]> => withMockDelay(orders),
  getAnalytics: async (): Promise<{ trends: TrendPoint[] }> => withMockDelay({ trends: hydrationTrend }),
  getContent: async (): Promise<ContentItem[]> => withMockDelay(contentItems),
  createContent: async (item: ContentItem): Promise<ContentItem> => withMockDelay(item),
}

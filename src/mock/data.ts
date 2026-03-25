import type { ContentItem, Order, Product, TrendPoint, User } from '../types'

export const users: User[] = [
  { id: 'U-1001', name: 'Julian Wan', email: 'julian@example.com', hydrationScore: 85, subscription: 'Pro', status: 'Active', joinDate: 'Oct 12, 2023' },
  { id: 'U-1002', name: 'Sarah Jenkins', email: 'sarah.j@outlook.com', hydrationScore: 42, subscription: 'Free', status: 'Active', joinDate: 'Nov 04, 2023' },
  { id: 'U-1003', name: 'Michael Chen', email: 'm.chen@google.com', hydrationScore: 98, subscription: 'Pro', status: 'Blocked', joinDate: 'Dec 20, 2023' },
  { id: 'U-1004', name: 'Emily Rodriguez', email: 'emily.r@techcorp.io', hydrationScore: 72, subscription: 'Free', status: 'Active', joinDate: 'Jan 15, 2024' },
  { id: 'U-1005', name: 'Ava Johnson', email: 'ava.j@aforce.com', hydrationScore: 91, subscription: 'Enterprise', status: 'Active', joinDate: 'Feb 10, 2024' },
]

export const products: Product[] = [
  { id: 'P-2001', name: 'Sony WH-1000XM5', sku: 'SNY-00192', category: 'Electronics', price: 399, stock: 142, status: 'Active' },
  { id: 'P-2002', name: 'Minimalist Analog Watch', sku: 'WTC-00441', category: 'Accessories', price: 120, stock: 4, status: 'Active' },
  { id: 'P-2003', name: 'Swift Run Sneakers', sku: 'RUN-00512', category: 'Footwear', price: 85, stock: 0, status: 'Inactive' },
  { id: 'P-2004', name: 'Sonic Boom Speaker', sku: 'SPK-00214', category: 'Electronics', price: 149, stock: 88, status: 'Active' },
]

export const orders: Order[] = [
  { id: '#AF-102394', customerName: 'Sarah Connor', customerEmail: 'sarah.c@gmail.com', amount: 48, status: 'Processing', date: 'Mar 12, 2026' },
  { id: '#AF-102385', customerName: 'John Miller', customerEmail: 'john.miller@me.com', amount: 124.5, status: 'Shipped', date: 'Mar 11, 2026' },
  { id: '#AF-102371', customerName: 'Elena Rose', customerEmail: 'elena.r@outlook.com', amount: 312, status: 'Pending', date: 'Mar 10, 2026' },
  { id: '#AF-102360', customerName: 'Marcus Thorne', customerEmail: 'm.thorne@corp.com', amount: 89.99, status: 'Delivered', date: 'Mar 10, 2026' },
  { id: '#AF-102352', customerName: 'Linda Wu', customerEmail: 'linda_wu@tech.net', amount: 210, status: 'Cancelled', date: 'Mar 09, 2026' },
]

export const contentItems: ContentItem[] = [
  { id: 'C-3001', title: 'Morning Hydration Ritual', subtitle: 'Updated 2h ago', type: 'Video', category: 'Morning', status: 'Published', createdAt: 'Oct 12, 2023' },
  { id: 'C-3002', title: 'Workout Recovery Science', subtitle: 'Drafting version 2.0', type: 'Article', category: 'Workout', status: 'Draft', createdAt: 'Oct 14, 2023' },
  { id: 'C-3003', title: 'Post-Sleep Electrolyte Mix', subtitle: 'Archived by Admin', type: 'Tip', category: 'Recovery', status: 'Archived', createdAt: 'Sep 28, 2023' },
  { id: 'C-3004', title: 'Abs & Water Retention', subtitle: 'Top performing article', type: 'Article', category: 'Recovery', status: 'Published', createdAt: 'Oct 05, 2023' },
]

export const hydrationTrend: TrendPoint[] = [
  { day: 'Mon', hydration: 62, previous: 54, logs: 32, intake: 21, checkins: 11 },
  { day: 'Tue', hydration: 68, previous: 59, logs: 45, intake: 25, checkins: 20 },
  { day: 'Wed', hydration: 78, previous: 70, logs: 50, intake: 29, checkins: 21 },
  { day: 'Thu', hydration: 74, previous: 66, logs: 41, intake: 22, checkins: 19 },
  { day: 'Fri', hydration: 63, previous: 60, logs: 38, intake: 18, checkins: 20 },
  { day: 'Sat', hydration: 58, previous: 56, logs: 26, intake: 12, checkins: 14 },
  { day: 'Sun', hydration: 71, previous: 67, logs: 34, intake: 16, checkins: 18 },
]

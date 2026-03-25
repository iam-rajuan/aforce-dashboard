export type UserStatus = 'Active' | 'Blocked'
export type SubscriptionType = 'Free' | 'Pro' | 'Enterprise'

export interface User {
  id: string
  name: string
  email: string
  hydrationScore: number
  subscription: SubscriptionType
  status: UserStatus
  joinDate: string
  avatar?: string
}

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: 'Active' | 'Inactive'
  image?: string
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  amount: number
  status: 'Processing' | 'Shipped' | 'Pending' | 'Delivered' | 'Cancelled'
  date: string
}

export interface ContentItem {
  id: string
  title: string
  subtitle?: string
  type: 'Video' | 'Article' | 'Tip'
  category: string
  status: 'Published' | 'Draft' | 'Archived'
  createdAt: string
  thumbnail?: string
}

export interface DashboardStat {
  title: string
  value: string
  trend: string
  accent?: 'green' | 'blue'
}

export interface TrendPoint {
  day: string
  hydration: number
  previous?: number
  logs?: number
  intake?: number
  checkins?: number
}

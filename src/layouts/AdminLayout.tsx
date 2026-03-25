import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar'
import { Topbar } from '../components/layout/Topbar'
import { Button } from '../components/ui/Button'
import { cn } from '../utils/cn'

const titles: Record<string, { title: string; subtitle: string; actionLabel?: string }> = {
  '/dashboard': { title: 'Dashboard Overview', subtitle: 'Platform performance summary', actionLabel: 'Last 30 days' },
  '/users': { title: 'User Management', subtitle: 'Manage and monitor user accounts', actionLabel: '+ Add User' },
  '/products': { title: 'Product Management', subtitle: 'Admin workspace', actionLabel: '+ Add Product' },
  '/orders': { title: 'Order Management', subtitle: 'Track fulfillment and refunds', actionLabel: 'Export Orders' },
  '/analytics': { title: 'Analytics Dashboard', subtitle: 'Monitor hydration engagement and sales', actionLabel: 'Last 7 Days' },
  '/content': { title: 'Content Management', subtitle: 'Manage videos, articles and tips', actionLabel: '+ Add Content' },
  '/ai-coaching': { title: 'AI Coaching Content', subtitle: 'Upload educational content', actionLabel: '+ Add New Video' },
}

export function AdminLayout() {
  const { pathname } = useLocation()
  const meta = titles[pathname] ?? { title: 'AForce Admin', subtitle: '' }
  const dashboardScrollMode = pathname === '/dashboard'

  return (
    <div className="min-h-screen bg-black text-white lg:flex">
      <Sidebar />
      <div className={cn('flex min-h-screen flex-1 flex-col', dashboardScrollMode && 'h-screen overflow-hidden')}>
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          action={meta.actionLabel ? <Button className="px-5">{meta.actionLabel}</Button> : undefined}
        />
        <main className={cn('flex-1 p-6', dashboardScrollMode && 'overflow-y-auto')}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

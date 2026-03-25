import { NavLink } from 'react-router-dom'
import { BarChart3, Bell, BookOpen, Bot, Box, Gauge, LayoutDashboard, Settings, ShoppingCart, UserCog, Users } from 'lucide-react'
import { cn } from '../../utils/cn'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Users', to: '/users', icon: Users },
  { label: 'Products', to: '/products', icon: Box },
  { label: 'Orders', to: '/orders', icon: ShoppingCart },
  { label: 'Analytics', to: '/analytics', icon: BarChart3 },
  { label: 'Content', to: '/content', icon: BookOpen },
  { label: 'AI Coaching', to: '/ai-coaching', icon: Bot },
  { label: 'Notifications', to: '/dashboard', icon: Bell },
  { label: 'Subscriptions', to: '/dashboard', icon: Gauge },
  { label: 'Settings', to: '/dashboard', icon: Settings },
]

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-border bg-sidebar p-4 lg:flex">
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-neon text-black">
          <UserCog className="h-4 w-4" />
        </div>
        <div>
          <p className="font-semibold text-white">AForce</p>
          <p className="text-xs text-text-dim">Admin Panel</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                cn('flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-text-muted transition hover:bg-panel hover:text-white', isActive && 'bg-neon/20 text-neon')
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-border bg-panel p-3">
        <p className="text-sm font-semibold text-white">Alex Rivera</p>
        <p className="text-xs text-text-dim">System Admin</p>
      </div>
    </aside>
  )
}

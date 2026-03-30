import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminLayout } from './layouts/AdminLayout'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { LoginPage } from './pages/auth/LoginPage'
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage'
import { SessionExpiredPage } from './pages/auth/SessionExpiredPage'
import { TwoFactorPage } from './pages/auth/TwoFactorPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { UsersPage } from './pages/users/UsersPage'
import { ProductsPage } from './pages/products/ProductsPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { AnalyticsPage } from './pages/analytics/AnalyticsPage'
import { ContentPage } from './pages/content/ContentPage'
import { AICoachingPage } from './pages/ai-coaching/AICoachingPage'
import { AuthenticatingPage } from './pages/auth/AuthenticatingPage'
import { NotificationsPage } from './pages/notifications/NotificationsPage'
import { SubscriptionsPage } from './pages/subscriptions/SubscriptionsPage'
import { SettingsPage } from './pages/settings/SettingsPage'
import { CmsPage } from './pages/cms/CmsPage'
import { ProfilePage } from './pages/profile/ProfilePage'

function NotFoundPage() {
  return <div className="grid min-h-screen place-items-center bg-black text-white">Page not found.</div>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/2fa" element={<TwoFactorPage />} />
        <Route path="/authenticating" element={<AuthenticatingPage />} />
        <Route path="/session-expired" element={<SessionExpiredPage />} />
        <Route path="/about-us" element={<CmsPage pageId="about-us" />} />
        <Route path="/privacy-policy" element={<CmsPage pageId="privacy-policy" />} />
        <Route path="/terms-and-conditions" element={<CmsPage pageId="terms-and-conditions" />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/ai-coaching" element={<AICoachingPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

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

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/ai-coaching" element={<AICoachingPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  userName: string
  login: (email: string, password: string) => boolean
  logout: () => void
}

const ADMIN_EMAIL = 'admin@aforce.com'
const ADMIN_PASSWORD = 'admin@123'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userName: 'Alex Rivera',
      login: (email, password) => {
        const valid = email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD
        if (valid) {
          set({ isAuthenticated: true })
        }
        return valid
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'aforce-auth',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated, userName: state.userName }),
    },
  ),
)

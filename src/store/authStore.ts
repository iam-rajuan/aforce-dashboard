import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  userName: string
  login: (email: string, password: string) => boolean
  logout: () => void
}

const ADMIN_EMAIL = 'admin@aforce.com'
const ADMIN_PASSWORD = 'admin@123'

export const useAuthStore = create<AuthState>((set) => ({
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
}))

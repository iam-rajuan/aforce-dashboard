import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthState {
  isAuthenticated: boolean
  userName: string
  userEmail: string
  userPassword: string
  userRole: string
  userImage: string
  login: (email: string, password: string) => boolean
  logout: () => void
  updateProfile: (profile: { userName: string; userEmail: string; userPassword: string; userImage: string }) => void
}

const ADMIN_EMAIL = 'admin@aforce.com'
const ADMIN_PASSWORD = 'admin@123'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      userName: 'Alex Rivera',
      userEmail: ADMIN_EMAIL,
      userPassword: ADMIN_PASSWORD,
      userRole: 'System Admin',
      userImage: '',
      login: (email: string, password: string): boolean => {
        const normalizedEmail = email.trim().toLowerCase()
        const { userEmail, userPassword } = get()
        const valid = normalizedEmail === userEmail.toLowerCase() && password === userPassword
        if (valid) {
          set({ isAuthenticated: true })
        }
        return valid
      },
      logout: () => set({ isAuthenticated: false }),
      updateProfile: ({ userName, userEmail, userPassword, userImage }: { userName: string; userEmail: string; userPassword: string; userImage: string }) =>
        set({
          userName,
          userEmail,
          userPassword,
          userImage,
        }),
    }),
    {
      name: 'aforce-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userName: state.userName,
        userEmail: state.userEmail,
        userPassword: state.userPassword,
        userRole: state.userRole,
        userImage: state.userImage,
      }),
    },
  ),
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { users as initialUsers } from '../mock/data'
import type { SubscriptionType, User, UserStatus } from '../types'

interface CreateUserInput {
  name: string
  email: string
  subscription: SubscriptionType
  status: UserStatus
}

interface UpdateUserInput extends CreateUserInput {
  id: string
}

interface UsersState {
  users: User[]
  createUser: (input: CreateUserInput) => User
  updateUser: (input: UpdateUserInput) => void
  setUserStatus: (id: string, status: UserStatus) => void
}

function formatJoinDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

function nextUserId(users: User[]) {
  const maxId = users.reduce((highest, user) => {
    const numeric = Number(user.id.replace(/\D/g, ''))
    return Number.isFinite(numeric) ? Math.max(highest, numeric) : highest
  }, 1000)

  return `U-${String(maxId + 1).padStart(4, '0')}`
}

export const useUsersStore = create<UsersState>()(
  persist(
    (set, get) => ({
      users: initialUsers,
      createUser: (input) => {
        const user: User = {
          id: nextUserId(get().users),
          name: input.name.trim(),
          email: input.email.trim(),
          hydrationScore: 0,
          subscription: input.subscription,
          status: input.status,
          joinDate: formatJoinDate(new Date()),
        }

        set((state) => ({ users: [user, ...state.users] }))
        return user
      },
      updateUser: (input) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === input.id
              ? {
                  ...user,
                  name: input.name.trim(),
                  email: input.email.trim(),
                  subscription: input.subscription,
                  status: input.status,
                }
              : user,
          ),
        })),
      setUserStatus: (id, status) =>
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, status } : user)),
        })),
    }),
    {
      name: 'aforce-users',
    },
  ),
)

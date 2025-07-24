import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  id: string
  email: string
  name: string
}

type AuthState = {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
  hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

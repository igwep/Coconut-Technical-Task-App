'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '../stores/userStores'
import { useEffect, useState } from 'react'

export function useProtectedPage() {
  const user = useAuthStore((state) => state.user)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    if (!hasHydrated) return // wait for hydration

    if (!user) {
      router.replace('/login')
    } else {
      setCheckingAuth(false)
    }
  }, [user, hasHydrated, router])

  return checkingAuth
}

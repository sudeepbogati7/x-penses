"use client"

import { useState, useEffect } from "react"
import AuthLoadingSkeleton from "@/components/RegisterLoadingSkeleton"

export function InitialLoadingWrapperAuth({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <AuthLoadingSkeleton />
  }

  return <>{children}</>
}


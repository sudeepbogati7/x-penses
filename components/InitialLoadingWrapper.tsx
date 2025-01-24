"use client"

import { useState, useEffect } from "react"
import { ExpenseTrackerSkeleton } from "@/components/overviewSkeleton"

export function InitialLoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <ExpenseTrackerSkeleton />
  }

  return <>{children}</>
}


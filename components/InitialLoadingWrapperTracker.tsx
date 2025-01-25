"use client"

import { useState, useEffect } from "react"
import { ExpenseTrackerSkeleton } from "@/components/overviewSkeleton"
import { ExpensePageLoading } from "./CommonSkeletonTracker"
export function InitialLoadingWrapperTracker({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <ExpensePageLoading />
  }

  return <>{children}</>
}


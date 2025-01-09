import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSkeleton() {
  return (
    <div className="w-full animate-pulse flex flex-col items-center justify-center mx-auto max-w-md space-y-6 p-6">
      {/* Title and subtitle skeletons */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Form fields skeletons */}
      <div className="space-y-4">
        {/* Full name field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Confirm password field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Register button skeleton */}
        <Skeleton className="h-10 w-full bg-gray-300" />

        {/* Login link skeleton */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  )
}


import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingSkeleton() {
  return (
    <div className="w-full mx-auto p-5 md:px-16 dark:bg-black">
      <Skeleton className=" bg-gray-200 h-8 w-3/4 mb-2" />
      <Skeleton className=" bg-gray-200 h-4 w-1/2 mb-8" />

      <div className="space-y-6">
        {/* Full name input skeleton */}
        <div>
          <Skeleton className=" bg-gray-200 h-4 w-24 mb-2" />
          <Skeleton className=" bg-gray-200 h-10 w-full" />
        </div>

        {/* Email input skeleton */}
        <div>
          <Skeleton className=" bg-gray-200 h-4 w-32 mb-2" />
          <Skeleton className=" bg-gray-200 h-10 w-full" />
        </div>

        {/* Password input skeleton */}
        <div>
          <Skeleton className=" bg-gray-200 h-4 w-20 mb-2" />
          <Skeleton className=" bg-gray-200 h-10 w-full" />
        </div>

        {/* Confirm password input skeleton */}
        <div>
          <Skeleton className=" bg-gray-200 h-4 w-36 mb-2" />
          <Skeleton className=" bg-gray-200 h-10 w-full" />
        </div>

        {/* Button skeleton */}
        <Skeleton className=" bg-gray-200 h-10 w-full" />
      </div>

      {/* "Already have account" text and link skeleton */}
      <div className="mt-6 flex items-center">
        <Skeleton className=" bg-gray-200 h-4 w-40 mr-2" />
        <Skeleton className=" bg-gray-200 h-8 w-20" />
      </div>
    </div>
  )
}


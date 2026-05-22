import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-4 flex flex-col transition-all">

      <Skeleton className="h-44 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />

      <Skeleton className="h-6 w-3/4 mt-4 mx-auto bg-gray-200 dark:bg-gray-800" />

      <Skeleton className="h-4 w-full mt-3 bg-gray-200 dark:bg-gray-800" />
      <Skeleton className="h-4 w-5/6 mt-2 mx-auto bg-gray-200 dark:bg-gray-800" />

      <Skeleton className="h-5 w-1/3 mt-4 mx-auto bg-gray-200 dark:bg-gray-800" />

      <Skeleton className="h-4 w-1/4 mt-3 mx-auto bg-gray-200 dark:bg-gray-800" />

      <Skeleton className="h-10 w-full mt-5 rounded-lg bg-gray-200 dark:bg-gray-800" />

    </div>
  );
}
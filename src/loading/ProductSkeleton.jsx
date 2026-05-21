import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col">

      
      <Skeleton className="h-44 w-full rounded-lg" />

      
      <Skeleton className="h-6 w-3/4 mt-4 mx-auto" />

    
      <Skeleton className="h-4 w-full mt-3" />
      <Skeleton className="h-4 w-5/6 mt-2 mx-auto" />

      
      <Skeleton className="h-5 w-1/3 mt-4 mx-auto" />

      
      <Skeleton className="h-4 w-1/4 mt-3 mx-auto" />

      
      <Skeleton className="h-10 w-full mt-5 rounded-lg" />

    </div>
  );
}
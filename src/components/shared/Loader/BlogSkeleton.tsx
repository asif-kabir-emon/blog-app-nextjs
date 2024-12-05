import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const BlogSkeleton = () => {
  return (
    <div className="w-full space-y-3 mt-5 flex flex-col md:flex-row items-center border-[1px] border-slate-200 p-4 rounded-[5px] gap-5">
      <Skeleton className="h-48 w-full md:w-60 bg-slate-300" />
      <div className="w-full md:h-48 space-y-3">
        <Skeleton className="h-5 w-full rounded-full bg-slate-300" />
        <div className="flex flex-row space-x-3">
          <Skeleton className="h-12 w-12 rounded-full bg-slate-300" />
          <div className="flex flex-col w-full justify-center gap-3">
            <Skeleton className="h-3 w-[50%] rounded-full bg-slate-300" />
            <Skeleton className="h-3 w-[50%] rounded-full bg-slate-300" />
          </div>
        </div>
        <Skeleton className="h-5 w-full rounded-full bg-slate-300" />
        <Skeleton className="h-5 w-full rounded-full bg-slate-300" />
        <Skeleton className="h-5 w-full hidden md:block rounded-full bg-slate-300" />
      </div>
    </div>
  );
};

export default BlogSkeleton;

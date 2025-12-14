import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDetail = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[100px] h-8" />
          <Skeleton className="w-[100px] h-8" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="w-[100px] h-8" />
          <Skeleton className="w-[100px] h-8" />
        </div>
      </div>
      <Separator className="mt-4" />
      <div className="grid grid-cols-[auto_1fr] gap-4 mt-4">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="h-8" />
      </div>
      <div className="grid grid-cols-4 gap-3 mt-4">
        {new Array(4).fill("").map(() => (
          <Card>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6" />
                <Skeleton className="h-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-4 mt-4">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="h-8" />
      </div>
      <div className="flex flex-col mt-4">
        <Card>
          <CardContent className="h-[300px]">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6" />
              <Skeleton className="h-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkeletonDetail;

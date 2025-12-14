import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-[30px_1fr] gap-3">
          <Skeleton className="h-[30px] rounded-full" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-6" />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-3">
          <Skeleton className="h-[20px] w-[30px]" />
          <Skeleton className="h-[20px] w-[30px]" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkeletonCard;

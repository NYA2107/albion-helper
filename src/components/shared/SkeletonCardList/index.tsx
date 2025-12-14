import type { FC } from "react";
import SkeletonCard from "../SkeletonCard";

type SkeletonCardListProps = {
  total: number;
  totalColumn: number;
};

const SkeletonCardList: FC<SkeletonCardListProps> = (props) => {
  const { total, totalColumn } = props;
  return (
    <div className={`grid grid-cols-${totalColumn} gap-2`}>
      {new Array(total).fill("").map(() => {
        return <SkeletonCard />;
      })}
    </div>
  );
};

export default SkeletonCardList;

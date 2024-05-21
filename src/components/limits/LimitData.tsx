import { Progress } from "@/components/ui/progress.tsx";
import { useGetWalletHook } from "@/components/hooks/WalletHooks/getWalletHook.tsx";
import { LimitListHook } from "@/components/hooks/LimitHooks/LimitListHook/LimitListHook.tsx";

const LimitData = ({
  category,
  $id,
  limit,
}: {
  category: string;
  $id: string;
  limit: string;
}) => {
  const { wallet } = useGetWalletHook();

  const { remaining, percentageUsed, totalAmountByCategory } = LimitListHook(
    category,
    limit,
    $id,
  );

  return (
    <div className="w-full ">
      <div className="flex items-center font-[600] my-1 justify-between w-[100%]">
        <div>{category}</div>
        <div className="flex items-center gap-1">
          <p>
            {remaining} {wallet?.currency}
          </p>
          <p className="text-sm text-[#999999]">
            {totalAmountByCategory > Number(limit) ? "over" : "left"}
          </p>
        </div>
      </div>
      <Progress
        value={percentageUsed}
        className="w-[100%] h-[5px] bg-[#161616] dark"
      />
    </div>
  );
};

export default LimitData;

import { useGetWallet } from "@/lib/react-query/queries&Mutations.tsx";
import { useParams } from "react-router";

const WalletExpectedBalance = () => {
  const { walletId } = useParams();
  const { data: wallet } = useGetWallet(walletId || "");

  return (
    <div className="flex border-2 border-[#27272A] w-full items-center justify-between p-2.5 h-[90px] rounded-lg xl:mt-11">
      <h3 className="text-[18px] text-[#8D8D8D]">Expected Balance</h3>
      <p className="text-[25px]">
        {wallet?.balance} {wallet?.currency}
      </p>
    </div>
  );
};

export default WalletExpectedBalance;

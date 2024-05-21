import Transactions from "@/components/transactions/Transactions.tsx";
import WalletHeader from "@/components/wallet/WalletHeader.tsx";
import WalletExpectedBalance from "@/components/wallet/WalletExpectedBalance.tsx";
import LimitByCategory from "@/components/limits/LimitByCategory.tsx";
import { useGetWalletHook } from "@/components/hooks/WalletHooks/getWalletHook.tsx";
import { useLoadingHook } from "@/components/hooks/LoadingHook/LoadingHook.tsx";

const Wallet = () => {
  const { wallet } = useGetWalletHook();
  const { loadingHook } = useLoadingHook();

  if (!wallet) {
    return loadingHook();
  }

  return (
    <section className="text-white w-full p-4 mt-[15px] lg:ml-[20px]">
      <div className="xl:flex xl:flex-row flex flex-col justify-center w-full xl:gap-20">
        {" "}
        <div className="xl:w-[60%] w-full h-full">
          <WalletHeader/>
          <div className='flex mt-6 lg:hidden'>
            <WalletExpectedBalance/>
          </div>
          <Transactions/>
        </div>
        <div className="xl:w-[40%] w-full flex flex-col gap-4">
          <div className='hidden mt-3 lg:flex'>
            <WalletExpectedBalance />
          </div>
          <LimitByCategory />
        </div>
      </div>
    </section>
  );
};

export default Wallet;

import { useLoadingHook } from "@/components/hooks/LoadingHook/LoadingHook.tsx";
import { useGetWalletsHook } from "@/components/hooks/WalletHooks/getWalletsHook.tsx";
import WalletDropdown from "@/components/dashboard/WalletDropdown/WalletDropdown.tsx";

const DashboardWallets = () => {
  const { loadingHook } = useLoadingHook();
  const { wallets } = useGetWalletsHook();

  if (!wallets) {
    return loadingHook();
  }

  return (
    <div className="overflow-hidden lg:w-[100%] dark">
      <div className="overflow-x-auto mt-5">
        <div className="flex gap-3">
          {wallets.map(({ name, currency, balance, $id }) => (
            <a key={$id} href={`/wallet/${$id}`} className="flex items-center gap-3 justify-between border-2 border-[#27272A] text-[#A7A7A7] w-[300px] p-2 rounded-lg flex-shrink-0">
              <div>
                <p className="text-sm">{name}</p>
                <span className="flex  items-center gap-2 text-[30px] font-[600] text-white">
                  <p>{balance.toFixed(2)}</p>
                  <p>{currency}</p>
                </span>
              </div>
              <button>
                <WalletDropdown $id={$id} />
              </button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardWallets;

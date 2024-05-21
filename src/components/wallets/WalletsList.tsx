import { useLoadingHook } from "@/components/hooks/LoadingHook/LoadingHook.tsx";
import {useGetWalletsHook} from "@/components/hooks/WalletHooks/getWalletsHook.tsx";
import WalletDropdown from "@/components/dashboard/WalletDropdown/WalletDropdown.tsx";

const WalletsList = () => {
  const {wallets} = useGetWalletsHook();
  const { loadingHook } = useLoadingHook();

  if (!wallets) {
    return loadingHook();
  }

  return (
    <li className='md:grid md:grid-cols-2 grid grid-cols-1'>
      {wallets.length > 0 ?
        wallets?.map(({ $id, name, balance, currency }) => (
          <a key={$id} href={`wallet/${$id}`}>
            <li className="border-2 border-[#272727] flex justify-between my-2 w-[95%] lg:w-[85%] p-2.5 rounded-lg">
              <div>
                <p className="text-[20px] mb-3 font-[600]">{name}</p>
                <h3 className="text-[#999999]">Total Amount</h3>
                <p className="text-[20px] font-[600]">
                  {balance.toFixed(2)} {currency}
                </p>
              </div>
              <WalletDropdown $id={$id}/>
            </li>
          </a>
        )) : <p className='border-2 border-[#27272A] p-2 rounded-lg text-center'>No Wallets</p>}
    </li>
  );
};

export default WalletsList;

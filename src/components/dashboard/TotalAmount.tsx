import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { useGetWalletsHook } from "@/components/hooks/WalletHooks/getWalletsHook.tsx";

const TotalAmount = () => {
  const { wallets } = useGetWalletsHook();
  return (
    <div>
      <h1>Total Money</h1>
      {wallets && wallets?.length > 0 ? (
        <>
          <ul className="flex flex-col gap-4">
            <ScrollArea className="h-[450px] w-full md:w-[95%] rounded-md">
              <div className="mt-5">
                {wallets.map(({ $id, balance, currency }) => (
                  <li
                    key={$id}
                    className="border-2 border-[#27272A] my-3 font-[600] text-[20px] justify-between items-center gap-5 flex p-2 rounded-lg"
                  >
                    <p>{balance.toFixed(2)}</p>
                    <p>{currency}</p>
                  </li>
                ))}
              </div>
            </ScrollArea>
          </ul>
        </>
      ) : (
        <h1 className="border-2 border-[#27272A] p-3 rounded-lg text-center text-[#999999] mt-5">
          No Wallets
        </h1>
      )}
    </div>
  );
};

export default TotalAmount;

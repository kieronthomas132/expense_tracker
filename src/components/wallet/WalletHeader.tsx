import TransactionDialog from "@/components/transactions/Dialogs/Transaction/TransactionDialog.tsx";
import {useParams} from "react-router";
import {useGetWallet} from "@/lib/react-query/queries&Mutations.tsx";

const WalletHeader = () => {
    const { walletId } = useParams();
    const { data: wallet } = useGetWallet(walletId || "");

    return (
    <div className="w-full">
      <h1 className="text-[20px] font-[600]">
        {wallet?.name && (
          <>
            {wallet?.name} ({wallet?.currency})
          </>
        )}
      </h1>
      <div className="mt-5 w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <h4 className="text-sm">Transactions</h4>
          </div>
          <div>
            <TransactionDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletHeader;

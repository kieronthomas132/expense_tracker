import TransactionsList from "@/components/dashboard/RecentTransactions/TransactionsList.tsx";
import {useGetRecentTransactionsHook} from "@/components/hooks/TransactionsHooks/getRecentTransactionsHook.tsx";

const RecentTransactions = () => {
  const {transactions} = useGetRecentTransactionsHook();

  return (
      <section className="w-full">
        <h1>Recent Transactions</h1>
        {transactions && transactions.length > 0 ? (
            <div>
              <div className="mt-5 flex flex-col gap-4">
                <TransactionsList/>
              </div>
            </div>
        ) : <h1 className='border-2 border-[#27272A] p-3 rounded-lg text-center text-[#999999] mt-5'>No Transactions</h1>}
      </section>
  );
};

export default RecentTransactions;

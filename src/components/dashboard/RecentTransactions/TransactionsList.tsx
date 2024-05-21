import { useGetRecentTransactionsHook } from "@/components/hooks/TransactionsHooks/getRecentTransactionsHook.tsx";

const TransactionsList = () => {
  const { transactions } = useGetRecentTransactionsHook();

  return (
    <>
      {transactions &&
        transactions
          .slice(0, 5)
          .map(
            ({
              $id,
              icon,
              category,
              amount,
              currency,
              description,
              walletId,
            }) => (
              <a
                key={$id}
                href={`wallet/${walletId}`}
                className="border-2 border-[#27272A] items-center gap-5 flex p-2.5 rounded-lg"
              >
                <div className="p-3 rounded-full bg-[#2F2F2F]">
                  <img src={icon} className="w-[20px]" alt={category} />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center text-[25px] font-[500]">
                    <h4>{amount}</h4>
                    <h4>{currency}</h4>
                  </div>
                  <p className="text-sm text-[#999999]">{description}</p>
                </div>
              </a>
            ),
          )}
    </>
  );
};

export default TransactionsList;

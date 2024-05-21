import Transaction from "@/components/transactions/Transaction.tsx";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { useLoadingHook } from "@/components/hooks/LoadingHook/LoadingHook.tsx";
import {useGetTransctionsHooks} from "@/components/hooks/TransactionsHooks/getTransactionsHook.tsx";

const Transactions = () => {
  const { transactions } = useGetTransctionsHooks();
  const { loadingHook } = useLoadingHook();

  if (!transactions) {
    return loadingHook();
  }

  const sortedTransactions = transactions
    ? [...transactions].sort((a, b) => {
        const dateA = new Date(a.event);
        const dateB = new Date(b.event);
        return dateB.getTime() - dateA.getTime();
      })
    : [];

  let currentDate: string | null = null;

  return (
    <ScrollArea className="h-[700px] dark w-full rounded-md ">
      {sortedTransactions &&
        sortedTransactions.length > 0 &&
        sortedTransactions.map(
          ({ $id, amount, category, description, event, icon, type }) => {
            const formattedDate = format(new Date(event), "EEEE d, yyyy");
            const renderDate = currentDate !== formattedDate;
            if (renderDate) {
              currentDate = formattedDate;
            }
            return (
              <div key={$id} className="mt-5">
                {renderDate && <h2>{formattedDate}</h2>}{" "}
                <Transaction
                  key={$id}
                  amount={amount}
                  category={category}
                  description={description}
                  type={type}
                  icon={icon}
                />
              </div>
            );
          },
        )}
      {sortedTransactions && sortedTransactions.length === 0 && (
        <h1 className="border border-[#27272A] mt-[40px] p-3 w-[100%] rounded-lg text-center text-[#808080]">
          No Transactions
        </h1>
      )}
    </ScrollArea>
  );
};

export default Transactions;

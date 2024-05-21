import { TabsTrigger } from "@/components/ui/tabs.tsx";

const TransactionTabsTrigger = () => {
  return (
    <div>
      <TabsTrigger
        className="rounded-full text-white text-[15px] w-[100px]"
        value="expense"
      >
        Expense
      </TabsTrigger>
      <TabsTrigger
        className="rounded-full text-white text-[15px] w-[100px]"
        value="income"
      >
        Income
      </TabsTrigger>
      <TabsTrigger
        className="rounded-full text-white text-[15px] w-[100px]"
        value="transfer"
      >
        Transfer
      </TabsTrigger>
    </div>
  );
};

export default TransactionTabsTrigger;

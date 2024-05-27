import { useGetWallet } from "@/lib/react-query/queries&Mutations.tsx";
import { useParams } from "react-router";

interface ITransaction {
  amount: number;
  category: string;
  description: string;
  icon: string;
  type: string;
}

const Transaction = ({
  amount,
  category,
  icon,
  description,
  type,
}: ITransaction) => {
  const { walletId } = useParams();
  const { data: wallet } = useGetWallet(walletId || "");

  const formatAmount = (amount: number, type: string) => {
    if (type === "expense") {
      return `${amount.toFixed(2)} ${wallet?.currency}`;
    } else if (type === "income") {
      return `+${amount.toFixed(2)} ${wallet?.currency}`;
    } else {
      return `${amount.toFixed(2)} ${wallet?.currency}`;
    }
  };

  return (
      <section className="p-4 border-2 border-[#27272A] w-[100%] my-5 rounded-lg">
        <div className="flex items-center gap-5">
          {icon && (
            <div className="bg-[#161616] p-3 rounded-full">
              <img src={icon} className="w-[20px]" alt={category} />
            </div>
          )}
          <div>
            <div className="font-[600] text-[30px]">
              <h5 className={type === "income" ? "text-green-500" : ""}>
                {formatAmount(amount, type)}
              </h5>
            </div>
            <p className="text-sm text-[#8D8D8D]">{description}</p>
          </div>
        </div>
      </section>
  );
};

export default Transaction;

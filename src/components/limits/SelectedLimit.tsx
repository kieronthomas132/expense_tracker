import { Button } from "@/components/ui/button.tsx";
import EditLimitDialog from "@/components/limits/LimitDialogs/EditLimitDialog.tsx";
import { useGetWalletHook } from "@/components/hooks/WalletHooks/getWalletHook.tsx";
import { LimitListHook } from "@/components/hooks/LimitHooks/LimitListHook/LimitListHook.tsx";

const SelectedLimit = ({
  $id,
  limit,
  category,
  selectedLimit,
}: {
  $id: string;
  limit: string;
  category: string;
  selectedLimit: string | null;
}) => {
  const { wallet } = useGetWalletHook();

  const { totalAmountByCategory, handleDeleteLimit, isDeletingLimit } =
    LimitListHook(category, limit, $id);

  return (
    <section>
      {selectedLimit === $id && (
        <div className="w-[90%] text-[#999999] text-[15px] mx-auto border-2 border-[#27272A] p-2.5 rounded-lg">
          <h4>
            Your total limit is{" "}
            <span className="text-white font-[700]">
              {limit} {wallet?.currency}
            </span>
          </h4>
          <h4>
            You've spent{" "}
            <span className="text-white font-[700]">
              {totalAmountByCategory} {wallet?.currency}
            </span>{" "}
            so far
          </h4>
          <div className="w-full flex gap-2 mt-2">
            <Button
              onClick={handleDeleteLimit}
              className="w-full hover:bg-red-500 hover:bg-opacity-50 bg-red-500 bg-opacity-50"
            >
              {isDeletingLimit ? "Removing" : "Remove"}
            </Button>
            <EditLimitDialog limit={limit} category={category} limitId={$id} />
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedLimit;

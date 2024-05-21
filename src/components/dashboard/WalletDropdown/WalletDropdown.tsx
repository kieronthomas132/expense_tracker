import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { useDeleteWallet } from "@/lib/react-query/queries&Mutations.tsx";

const WalletDropdown = ({ $id }: { $id: string }) => {

  const { mutateAsync: deleteWallet } = useDeleteWallet();

  const handleDeleteWallet = async () => {
    return await deleteWallet($id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <HiDotsVertical className="text-[#999999]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-black border-2 border-[#27272A] text-white">
        <DropdownMenuItem
          onClick={handleDeleteWallet}
          className="flex items-center justify-between"
        >
          <span>Delete Wallet</span>
          <span>
            <FaTrash />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletDropdown;

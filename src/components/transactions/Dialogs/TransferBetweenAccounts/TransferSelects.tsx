import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {useGetWalletsHook} from "@/components/hooks/WalletHooks/getWalletsHook.tsx";

interface ITransfer {
  transferLabel: string;
  transferValue: string;
  handleSelectedAccount: (value: string) => void;
}
const TransferSelects = ({
  transferLabel,
  transferValue,
  handleSelectedAccount,
}: ITransfer) => {
  const {wallets, isWalletsFetching} = useGetWalletsHook()
  return (
    <div>
      <Label htmlFor="from" className="text-right">
        {transferLabel}
      </Label>
      <Select value={transferValue} onValueChange={handleSelectedAccount}>
        <SelectTrigger className="w-[180px] bg-black text-white">
          <SelectValue placeholder="Enter Account" />
        </SelectTrigger>
        <SelectContent>
          {isWalletsFetching ? (
              <div className='flex items-center justify-center'>
                <AiOutlineLoading3Quarters className='animate-spin text-[20px]'/>
              </div>
          ) : (
            <SelectGroup className="bg-black text-white">
              {wallets &&
                wallets.map(({ name, $id }) => (
                  <SelectItem key={$id} value={$id}>
                    {name}
                  </SelectItem>
                ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TransferSelects;

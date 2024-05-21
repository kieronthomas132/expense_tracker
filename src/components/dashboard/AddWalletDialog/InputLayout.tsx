import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import {IAddToWalletInputLayout} from '@/components/interfaces/interfaces.tsx'

const InputLayout = ({
  label,
  name,
  id,
  type,
  value,
  onChange,
  htmlFor,
}: IAddToWalletInputLayout) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={htmlFor} className="text-right">
        {label}
      </Label>
      <Input
        name={name}
        id={id}
        type={type}
        required={true}
        className="col-span-3 text-white bg-black"
        placeholder="Halifax"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputLayout;

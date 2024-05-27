import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

interface ICategory {
  category: string;
  icon: string;
}

interface ISelectLayout {
  name?: string;
  value?: string;
  onValueChange: (value: string) => void;
  categories?: ICategory[];
  currencies?: { code: string; name: string }[];
  defaultValue?: string;
}

const SelectLayout = ({
  name,
  value,
  onValueChange,
  categories,
  currencies,
  defaultValue,
}: ISelectLayout) => {

  return (
    <Select
      name={name}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className=" w-[100px] bg-black">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-black text-white">
        <SelectGroup>
          {(categories &&
            categories.map(({ category, icon }, index) => (
              <SelectItem value={category} key={index}>
                <div className="flex items-center gap-1">
                  <img className='w-[15px]' src={icon} alt={category} />
                  <p>{category}</p>
                </div>
              </SelectItem>
            ))) ||
            (currencies &&
              currencies.map(({ code, name }) => (
                <SelectItem key={name} value={code}>
                  {code}
                </SelectItem>
              )))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectLayout;

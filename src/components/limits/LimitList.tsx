import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ILimit } from "@/components/interfaces/interfaces.tsx";
import { LimitListHook } from "@/components/hooks/LimitHooks/LimitListHook/LimitListHook.tsx";
import SelectedLimit from "@/components/limits/SelectedLimit.tsx";
import LimitData from "@/components/limits/LimitData.tsx";

const LimitList = ({ category, icon, limit, $id }: ILimit) => {
  const {
    selectedLimit,
    handleClick,
  } = LimitListHook(category, limit, $id);

  return (
    <>
      <section key={$id} className="flex p-4 items-center gap-4">
        <div className="bg-[#161616] p-3 rounded-full">
          <img src={icon} alt={category} className="w-[25px]" />
        </div>
        <LimitData $id={$id} category={category} limit={limit} />
        <div>
          <button
            onClick={handleClick}
            className="text-[#999999] hover:bg-[#161616] p-2 rounded-lg"
          >
            {selectedLimit === $id ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>
      </section>
      <SelectedLimit
        selectedLimit={selectedLimit}
        $id={$id}
        limit={limit}
        category={category}
      />
    </>
  );
};

export default LimitList;

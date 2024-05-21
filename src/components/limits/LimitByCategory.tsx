import LimitByCategoryDialog from "@/components/limits/LimitDialogs/LimitByCategoryDialog.tsx";
import LimitList from "@/components/limits/LimitList.tsx";
import {useGetLimitsByCategoryHook} from "@/components/hooks/GetLimitsByCategoryHook/getLimitsByCategoryHook.tsx";

const LimitByCategory = () => {
    const {limits} = useGetLimitsByCategoryHook();


  return (
    <section className="border-2 border-[#27272A] p-2 rounded-lg">
      <div className="flex text-[#8D8D8D] justify-between items-center">
        <h1 className="text-md">Limits By Category</h1>
        <LimitByCategoryDialog />
      </div>
      {limits &&
        limits
          .slice(0, 4)
          .map(({ $id, category, icon, limit }) => (
            <LimitList
              key={$id}
              category={category}
              limit={limit}
              $id={$id}
              icon={icon}
            />
          ))}
    </section>
  );
};

export default LimitByCategory;

import {useGetWallets} from "@/lib/react-query/queries&Mutations.tsx";
import {useUserStore} from "@/zustand/UserStore.tsx";

export const useGetWalletsHook = () => {
    const {user} = useUserStore()
    const { data: wallets, isFetching: isWalletsFetching } = useGetWallets(user?.id || "");

    return { wallets, isWalletsFetching};
};

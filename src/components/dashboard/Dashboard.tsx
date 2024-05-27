import AddWalletDialog from "@/components/dashboard/AddWalletDialog/AddWalletDialog.tsx";
import DashboardWallets from "@/components/dashboard/DashboardWallets.tsx";
import RecentTransactions from "@/components/dashboard/RecentTransactions/RecentTransactions.tsx";
import TotalAmount from "@/components/dashboard/TotalAmount.tsx";
import { useGetWalletsHook } from "@/components/hooks/WalletHooks/getWalletsHook.tsx";
import { useLoadingHook } from "@/components/hooks/LoadingHook/LoadingHook.tsx";

const Dashboard = () => {
    const { wallets } = useGetWalletsHook();
    const { loadingHook } = useLoadingHook();

    if (!wallets) {
        return loadingHook();
    }

    return (
        <section className="p-4 w-full lg:w-[80%]">
            <div className="flex items-center justify-between full">
                <h1 className="text-[25px]">Dashboard</h1>
                <span className='hidden lg:flex'>
                <AddWalletDialog/>
                </span>
            </div>
            <DashboardWallets/>
            <div className='md:hidden mt-4 block'>
                <TotalAmount/>
            </div>
            <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 gap-4">
                <RecentTransactions/>
                <div className='hidden md:block'>
                    <TotalAmount/>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;

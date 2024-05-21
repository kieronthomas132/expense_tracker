import "./index.css";
import { useEffect, useState } from "react";
import AuthDialog from "@/components/auth/AuthDialog/AuthDialog.tsx";
import { checkAuth, useUserStore } from "./zustand/UserStore.tsx";
import { Route, Routes } from "react-router";
import Dashboard from "@/components/dashboard/Dashboard.tsx";
import Sidebar from "@/components/sidebar/Sidebar.tsx";
import Wallets from "@/components/wallets/Wallets.tsx";
import Wallet from "@/components/wallet/Wallet.tsx";
import { useLoadingHook } from "@/components/hooks/LoadingHook/LoadingHook.tsx";
import { useGetRecentTransactionsHook } from "@/components/hooks/TransactionsHooks/getRecentTransactionsHook.tsx";
import SidebarSmall from "@/components/sidebar/sidebarSmall.tsx";

const App = () => {
  //state for AuthDialog activation
  const [open, setOpen] = useState<undefined | boolean>(undefined);

  //fetch user information
  const { user } = useUserStore();
  const { transactions } = useGetRecentTransactionsHook();
  const { loadingHook } = useLoadingHook();

  //authenticate user on initial opening
  useEffect(() => {
    const authenticateUser = async () => {
      const isAuthenticated = await checkAuth();
      setOpen(!isAuthenticated);
    };
    authenticateUser();
  }, [user?.id]);

  //return loading animation until user and transaction is fetched
  if (!transactions) {
    return loadingHook();
  }

  return (
    <div className="text-white relative flex font-open-sans">
      <AuthDialog open={open} setOpen={setOpen} />

      {user && user.id && (
        <>
          <Sidebar />
          <div className='absolute right-5 top-5'>
            <SidebarSmall/>
          </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/wallet/:walletId" element={<Wallet />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;

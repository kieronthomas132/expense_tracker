import { AiOutlineLogin } from "react-icons/ai";
import {useUserStore} from "@/zustand/UserStore.tsx";
import {useSignOutAccount} from "@/lib/react-query/queries&Mutations.tsx";

const SidebarSignOutButton = () => {
    const { user, setUser } = useUserStore();
    const { mutateAsync: signOutAccount } = useSignOutAccount();

    //function to handle sign out - removes cookie from localstorage
    //removes user information from user state
    const handleSignOut = async () => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (cookieFallback) {
            const loggedOut = await signOutAccount();
            localStorage.removeItem("cookieFallback");
            setUser(undefined);
            return loggedOut;
        }
    };

  return (
    <>
      {user && user.id && (
        <button
          onClick={handleSignOut}
          className="flex p-2.5 items-center gap-4 text-[#8D8D8D]"
        >
          <p>{<AiOutlineLogin />}</p>
          <h3>Sign Out</h3>
        </button>
      )}
    </>
  );
};

export default SidebarSignOutButton;
